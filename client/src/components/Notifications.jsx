import { useEffect, useState } from "react";
import socket from "../utils/socket"; // Use the shared socket

function Notifications() {
  const [missedMessages, setMissedMessages] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);

  useEffect(() => {
    // Listen for previous messages from the server
    socket.on("previous messages", (messages) => {
      setPreviousChats(messages);
    });

    // Listen for missed messages from the server
    socket.on("missed messages", (missed) => {
      setMissedMessages(missed);
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      socket.off("previous messages");
      socket.off("missed messages");
    };
  }, []);

  return (
    <div>
      <h2>Previous Chats</h2>
      <ul>
        {previousChats.map((msg, index) => (
          <li key={index}>
            From: {msg.from}, To: {msg.to}, Message: {msg.text}
            <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <h2>Missed Chats</h2>
      <ul>
        {missedMessages.map((msg, index) => (
          <li key={index}>
            From: {msg.from}, To: {msg.to}, Message: {msg.text}
            <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
