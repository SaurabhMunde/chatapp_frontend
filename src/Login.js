import React, { useState, useEffect } from "react";
import { useWebSocket } from "./useWebSocket";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const { registerUsername, isUsernameValid, isConnected } = useWebSocket();

  const handleLogin = () => {
    registerUsername(username);

  };

  // Disable button if WebSocket is not connected
  const isJoinButtonDisabled = !isConnected || !username;

  useEffect(() => {
  const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setLoggedIn(true); // If username is in localStorage, directly log in
    }
  }, [setLoggedIn]);

   useEffect(() => {
      // If username is valid, navigate to the chat
      if (isUsernameValid) {
        setLoggedIn(true);
      }
    }, [isUsernameValid, setLoggedIn]);

  return (
    <div>
      <h2>Select a Username</h2>
      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isJoinButtonDisabled}>
        Join
      </button>
      {!isUsernameValid && <p style={{ color: "red" }}>Username already taken!</p>}
    </div>
  );
};

export default Login;
