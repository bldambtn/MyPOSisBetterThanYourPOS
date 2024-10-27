import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_IN_ORGANIZATION } from "../utils/queries";
import socket from "../utils/socket";

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const userId = localStorage.getItem("userId");
  const organization = localStorage.getItem("organization");

  useEffect(() => {
    async function loadChatHistory() {
      try {
        const response = await fetch(`http://localhost:3001/api/chat/history/${userId}/${recipientId}`);
        const history = await response.json();
        setMessages(history);
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    }
  
    if (userId && recipientId) {
      loadChatHistory();
    }
  }, [userId, recipientId]);
  

  const { loading, error, data } = useQuery(GET_USERS_IN_ORGANIZATION, {
    variables: { organization },
    skip: !organization,
  });

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (!recipientId) {
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
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header" onClick={toggleChat}>
        Chat
      </div>

      {isOpen && (
        <div className="chat-content">
          {loading && <p>Loading users...</p>}
          {error && <p>Error loading users</p>}
          {!loading && !error && (
            <>
              <select
                className="chat-dropdown"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              >
                <option value="">Select a user</option>
                {data?.usersInOrganization
                  .filter((user) => user._id !== userId)
                  .map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
              </select>

              <textarea
                className="chat-textbox"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button className="chat-send-button" onClick={handleSendMessage}>
                Send
              </button>

              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>
                    <strong>
                      {data?.usersInOrganization.find(user => user._id === msg.from)?.firstName || 'Unknown'}:
                    </strong> {msg.text} <br />
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
