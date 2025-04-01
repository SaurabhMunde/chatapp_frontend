import React, { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Chat />
      ) : (
        <Login setLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
