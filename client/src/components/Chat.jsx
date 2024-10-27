import React from "react";

function Chat({ messages, users }) {
  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => {
          const sender = users.find((user) => user._id === msg.from);
          return (
            <li key={index}>
              <strong>{sender ? sender.firstName : "Unknown"}:</strong> {msg.text}
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
