import React, { useState, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";

const Chat = () => {
  const { messages, sendMessage } = useWebSocket();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Anonymous";
    setUsername(storedUsername);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    sendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="chat-container">
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
