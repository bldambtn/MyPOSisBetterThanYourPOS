const express = require("express");
const http = require("http"); // Import HTTP module to create the server
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { Server } = require("socket.io"); // Import Socket.io
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth"); // Import authMiddleware

const PORT = process.env.PORT || 3001;
const app = express();

// Create an HTTP server to attach both Apollo and Socket.io to
const httpServer = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store missed messages for offline users
const missedMessages = {};

// Initialize Apollo Server with GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start both Apollo and Socket.io
const startApolloServer = async () => {
  await server.start();

  // Use middlewares for Apollo GraphQL and Express
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
      context: authMiddleware, // Use authMiddleware for context
    })
  );

  // Handle Socket.io connections and events
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`🔌 User connected: ${socket.id}, User ID: ${userId}`);

    // Send missed messages to the user upon reconnect
    if (missedMessages[userId]) {
      socket.emit("missed messages", missedMessages[userId]);
      delete missedMessages[userId]; // Clear once delivered
    }

    // Listen for incoming chat messages
    socket.on("chat message", (messageData) => {
      const recipientId = messageData.to; // Assuming recipient ID is in messageData

      console.log("Message received: ", messageData);

      // Check if the recipient is online
      if (!io.sockets.sockets.get(recipientId)) {
        // Store the message for offline users
        if (!missedMessages[recipientId]) {
          missedMessages[recipientId] = [];
        }
        missedMessages[recipientId].push(messageData);
        console.log(`Message stored for offline recipient: ${recipientId}`);
      } else {
        // If recipient is online, send the message directly
        io.to(recipientId).emit("chat message", messageData);
        console.log(`Message delivered to online recipient: ${recipientId}`);
      }
    });

    // Handle user disconnecting
    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${userId}`);
    });
  });

  // Start the HTTP server with both Apollo and Socket.io
  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      console.log(`Socket.io server running on port ${PORT}!`);
    });
  });
};

// Call the function to start the server
startApolloServer();
