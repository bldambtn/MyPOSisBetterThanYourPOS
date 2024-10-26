import { io } from "socket.io-client";

// Retrieve the userId from localStorage dynamically
const userId = localStorage.getItem("userId");

const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://www.superiorsupply.io"
    : "http://localhost:3001",
  {
    query: { userId },
    transports: ['websocket', 'polling'],
  }
);

socket.on("connect", () => {
  console.log(`Socket connected: ${socket.id} with User ID: ${userId}`);
});

export default socket;
