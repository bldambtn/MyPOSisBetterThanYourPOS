import React from "react";

function Chat({ messages, users }) {
  console.log("Users data:", users);
  console.log("Messages data:", messages);

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => {
          const sender = users.find((user) => user._id === msg.from);
          const senderName = sender
            ? `${sender.firstName || "Unknown"} ${sender.lastName || ""}`.trim()
            : "Unknown";

          return (
            <li key={index}>
              <strong>{senderName}:</strong> {msg.text}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Chat;
