import { useEffect, useState } from "react";
import io from "socket.io-client";

// Ensure you are connecting to the correct port for the Socket.io server
const socket = io("http://localhost:3001");

function Notifications() {
  const [missedMessages, setMissedMessages] = useState([]);

  useEffect(() => {
    // Listen for missed messages from the server
    socket.on("missed messages", (missed) => {
      setMissedMessages(missed);
    });
  }, []);

  return (
    <div>
      <ul>
        {missedMessages.map((msg, index) => (
          <li key={index}>
            From: {msg.from}, To: {msg.to} <br />
            Message: {msg.text} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
