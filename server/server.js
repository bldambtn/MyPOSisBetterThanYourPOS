require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
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

// Apply CORS middleware to all routes for Express and Socket.io
const corsOptions = {
  origin: ["http://localhost:3000", "https://www.superiorsupply.io"],
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const io = new Server(httpServer, { cors: corsOptions });

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Middleware to parse JSON
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // GraphQL endpoint with auth middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Chat history endpoint
  app.get("/api/chat/history/:userId/:recipientId", async (req, res) => {
    try {
      const { userId, recipientId } = req.params;
  
      // Fetch chat messages between the two users, sorted by timestamp
      const messages = await Message.find({
        $or: [
          { from: userId, to: recipientId },
          { from: recipientId, to: userId },
        ],
      }).sort({ timestamp: 1 });
  
      // Check if messages exist
      if (messages && messages.length > 0) {
        res.json(messages); // Send back messages if found
      } else {
        res.status(404).json({ error: "No chat history found between these users." });
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
      res.status(500).json({ error: "Error fetching chat history" });
    }
  });
  // Socket.io connection handling
  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      socket.join(userId);
      console.log(`User connected: Socket ID: ${socket.id}, User ID: ${userId}`);

      // Load message history for the user
      Message.find({ $or: [{ from: userId }, { to: userId }] })
        .sort({ timestamp: 1 })
        .then((history) => {
          socket.emit("load chat history", history);
        });

      // Handle incoming chat message
      socket.on("chat message", async (messageData) => {
        const { from, to, text } = messageData;
        const newMessage = new Message({
          from,
          to,
          text,
          timestamp: new Date(),
        });

        await newMessage.save();

        // Emit to both sender and recipient
        io.to(to).emit("chat message", newMessage);
        io.to(from).emit("chat message", newMessage);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId}`);
      });
    }
  });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL at http://localhost:${PORT}/graphql`);
    });
  }).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
};

startApolloServer();
