import { useEffect, useState } from "react";
import socket from "../utils/socket"; // Use the shared socket

function Notifications() {
  const [previousChats, setPreviousChats] = useState([]);
  const [missedChats, setMissedChats] = useState([]);

  useEffect(() => {
    socket.on("previous messages", (messages) => {
      setPreviousChats(messages);
    });

    socket.on("missed messages", (messages) => {
      setMissedChats(messages);
    });

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
          </li>
        ))}
      </ul>

      <h2>Missed Chats</h2>
      <ul>
        {missedChats.map((msg, index) => (
          <li key={index}>
            From: {msg.from}, To: {msg.to}, Message: {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
