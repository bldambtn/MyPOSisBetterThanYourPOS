import { useState } from "react";
import Chat from "./Chat"; // Importing Chat component

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="chat-window"
      style={{
        position: "fixed",
        bottom: "50px", // Positioned just above the footer
        right: "20px",
        width: "300px",
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div
        className="chat-header"
        onClick={toggleChat}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        Chat {/* Header visible even when minimized */}
      </div>

      {isOpen && (
        <div
          className="chat-content"
          style={{
            background: "white",
            height: "300px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Chat /> {/* Renders the Chat component */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
