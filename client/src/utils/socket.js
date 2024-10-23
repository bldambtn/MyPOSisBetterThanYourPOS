import { io } from "socket.io-client";

// Reuse the same socket connection across the app
const socket = io("http://localhost:3001", {
  query: { userId: "currentUserId" }, // Use actual user ID dynamically
});

export default socket;
