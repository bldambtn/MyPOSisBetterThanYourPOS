require("dotenv").config();
const express = require("express");
const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const Message = require("./models/message");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

// CORS configuration for Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://www.superiorsupply.io",],
    methods: ["GET", "POST"],
    credentials: false,
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

  app.get('/', (req, res) => res.send('API is live!')); // Health check endpoint

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.warn("User ID not provided or invalid.");
      return;
    }
    
    console.log(`🔌 User connected: ${socket.id}, User ID: ${userId}`);
    socket.join(userId);
    
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
    
    socket.on("chat message", async (messageData) => {
      const recipientId = messageData.to;
    
      if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
        console.error("Invalid recipient ID:", recipientId);
        return;
      }
    
      messageData.timestamp = new Date();
    
      try {
        const message = new Message({
          from: userId,
          to: recipientId,
          text: messageData.text,
          timestamp: messageData.timestamp,
          isDelivered: false,
        });
    
        await message.save();
        io.to(recipientId).emit("chat message", message);
      } catch (err) {
        console.error("❌ Error saving message:", err);
      }
    });
    
    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${userId}`);
    });
  });

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      httpServer.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
    });
};

startApolloServer();
