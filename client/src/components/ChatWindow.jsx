import { useState } from "react";
import Chat from "./Chat"; // Importing Chat component

function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-window">
      <div className="chat-header" onClick={toggleChat}>
        Chat
      </div>

      {isOpen && (
        <div className="chat-content">
          {/* Dropdown for selecting a user */}
          <select className="chat-dropdown">
            <option>Select a user</option>
          </select>

          {/* Text input for entering the message */}
          <textarea
            className="chat-textbox"
            placeholder="Type a message"
          ></textarea>

          {/* Send button */}
          <button className="chat-send-button">Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
