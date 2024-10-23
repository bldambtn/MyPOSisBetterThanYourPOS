import { useState, useEffect } from "react";
import socket from "../utils/socket"; // Use the shared socket connection

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState(""); // For selecting recipient

  useEffect(() => {
    // Listen for messages from the server
    socket.on("chat message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    const messageData = {
      from: "currentUserId", // Replace with actual user ID
      to: recipientId,
      text: message,
    };

    socket.emit("chat message", messageData);
    setMessage(""); // Clear input after sending
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.text} <br />
            <small>{new Date().toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      >
        <option value="">Select a user</option>
        <option value="userId2">User 2</option>
        <option value="userId3">User 3</option>
      </select>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
