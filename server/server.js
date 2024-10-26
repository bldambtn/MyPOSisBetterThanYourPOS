require("dotenv").config();
const express = require("express");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { Server } = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const Message = require("./models/message");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://www.superiorsupply.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
  
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.warn("User ID not provided or is not a valid ObjectId during connection.");
      return;
    }
  
    console.log(`🔌 User connected: ${socket.id}, User ID: ${userId}`);
    socket.join(userId); // Make sure the user joins their own room for messaging.
  
    // Fetch and send missed messages from MongoDB
    Message.find({ to: userId, isDelivered: false })
      .then((messages) => {
        if (messages.length > 0) {
          console.log(`Sending missed messages to User ID: ${userId}`);
          socket.emit("missed messages", messages);
          return Message.updateMany({ to: userId, isDelivered: false }, { isDelivered: true });
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching missed messages:", err);
      });
  
    // Listen for chat messages
    socket.on("chat message", async (messageData) => {
      const recipientId = messageData.to;
  
      // Validate the recipientId
      if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
        console.error("Invalid recipient ID:", recipientId);
        return;
      }
  
      messageData.timestamp = new Date();
  
      // Save the message in MongoDB
      try {
        const message = new Message({
          from: userId,
          to: recipientId,
          text: messageData.text,
          timestamp: messageData.timestamp,
          isDelivered: false,
        });
  
        await message.save();
        console.log("Message saved:", message);
  
        // Emit the message to the intended recipient
        io.to(recipientId).emit("chat message", message);
      } catch (err) {
        console.error("❌ Error saving message:", err);
      }
    });
  
    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${userId}`);
    });
  });

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      httpServer.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        console.log(`Socket.io server running on port ${PORT}!`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
    });
};

startApolloServer();
