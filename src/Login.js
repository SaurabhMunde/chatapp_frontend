import {useState} from "react";
import { useWebSocket } from "./useWebSocket";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const { registerUsername, isUsernameValid } = useWebSocket();

  const handleLogin = () => {
    registerUsername(username);
  };

  return (
    <div>
      <h2>Select a Username</h2>
      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Join</button>
      {!isUsernameValid && <p style={{ color: "red" }}>Username already taken!</p>}
    </div>
  );
};

export default Login;