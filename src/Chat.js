import React, {useState} from "react";
import { useWebSocket } from "./useWebSocket";

const Chat = ({ setLoggedIn }) => {
  const { messages, sendMessage } = useWebSocket();
  const [message, setMessage] = useState("");

  // Logout function to clear username from localStorage
  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false); // Reset login state in the parent component
  };

  const handleSend = () => {
    if (!message.trim()) return; // Prevent empty messages
    sendMessage(message);
    setMessage(""); // Clear input
  };

  return (
    <div className="chat-container">
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
