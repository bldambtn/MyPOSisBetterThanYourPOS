import { io } from "socket.io-client";

// Initialize the socket connection (change the URL if needed)
const socket = io("http://localhost:3001");

export default socket;
