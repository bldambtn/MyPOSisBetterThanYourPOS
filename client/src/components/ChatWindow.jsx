import { useState } from "react";
import Chat from "./Chat"; // Assuming you have a Chat component or will create one

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ position: "fixed", bottom: "0", right: "0", width: "300px" }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Minimize" : "Chat"}
      </button>

      {isOpen && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            background: "white",
          }}
        >
          {/* Add your Chat component here */}
          <Chat />
        </div>
      )}
    </div>
  );
}

export default ChatWindow;