import React, { useState } from "react";
import { useWebSocket } from "./useWebSocket";

const Chat = () => {
  const { messages, sendMessage } = useWebSocket();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User");

  return (
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
      <button onClick={() => { sendMessage(message, username); setMessage(""); }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
