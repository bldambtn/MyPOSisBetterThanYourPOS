import { useState } from "react";
import Chat from "./Chat"; // Importing Chat component

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ position: "fixed", bottom: "0", right: "0", width: "300px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Chat {/* Changed from Minimize */}
      </button>

      {isOpen && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            background: "white",
            height: "300px",
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
