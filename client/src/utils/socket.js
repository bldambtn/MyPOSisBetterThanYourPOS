import { io } from "socket.io-client";

const userId = localStorage.getItem("userId") || "defaultGuestId";

const socket = io(
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL || "https://www.superiorsupply.io"
    : "http://localhost:3001",
  {
    query: { userId },
    transports: ['websocket', 'polling'],
  }
);

socket.on("connect", () => {
  console.log(`Socket connected: ${socket.id} with User ID: ${userId}`);
});

socket.on("connect_error", (err) => {
  console.error("Connection Error:", err);
});

socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

export default socket;
