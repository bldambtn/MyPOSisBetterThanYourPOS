import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_IN_ORGANIZATION } from "../utils/queries";
import socket from "../utils/socket";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [organization, setOrganization] = useState("");
  const [userId, setUserId] = useState(""); // Track the logged-in user ID

 useEffect(() => {
  // Retrieve user and organization information from local storage
  const storedOrganization = localStorage.getItem("organization");
  const storedUserId = localStorage.getItem("userId");

  if (storedOrganization) {
    setOrganization(storedOrganization);
  }

  if (storedUserId) {
    setUserId(storedUserId);
    socket.emit("connect_user", storedUserId); // Use the user ID for socket connection
  }

  socket.on("chat message", (messageData) => {
    setMessages((prevMessages) => [...prevMessages, messageData]);
  });

  socket.on("missed messages", (missedMessages) => {
    setMessages((prevMessages) => [...prevMessages, ...missedMessages]);
  });

  return () => {
    socket.off("chat message");
    socket.off("missed messages");
  };
}, []);


  const { loading, error, data } = useQuery(GET_USERS_IN_ORGANIZATION, {
    variables: { organization },
    skip: !organization,
  });

  if (loading) return <p>Loading users...</p>;
  if (error) {
    console.error("Error loading users:", error);
    return <p>Error loading users</p>;
  }

  const users = data?.usersInOrganization || [];

  const sendMessage = () => {
    if (!recipientId) {
      console.error("Recipient ID is not selected.");
      alert("Please select a recipient before sending a message.");
      return;
    }

    const messageData = {
      from: userId,
      to: recipientId,
      text: message,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]); // Add the sent message to the chat box
    setMessage(""); // Clear input
  };

  return (
    <div>
      <h2>Chat Box</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>
              {users.find(user => user._id === msg.from)?.firstName}:
            </strong>{" "}
            {msg.text} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
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
        {users
          .filter((user) => user._id !== userId) // Exclude the logged-in user from the dropdown
          .map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
      </select>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
