import React from "react";

function Chat({ messages, users }) {
  return (
    <div>
      <h2>Chat Box</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>
              {users.find((user) => user._id === msg.from)?.firstName || "User"}:
            </strong>{" "}
            {msg.text} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
