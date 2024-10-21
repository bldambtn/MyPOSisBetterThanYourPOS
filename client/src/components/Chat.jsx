import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Adjust this URL if needed

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("chat message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit message to the server
      socket.emit("chat message", message);
      setMessage(""); // Clear input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        onKeyPress={handleKeyPress} // Handle enter key for sending message
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
