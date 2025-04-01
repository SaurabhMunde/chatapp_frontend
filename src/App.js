import React, { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    //  // Check if the username exists in localStorage on component mount
    //  useEffect(() => {
    //    const username = localStorage.getItem("username");
    //    if (username) {
    //      setIsLoggedIn(true);  // If username is found, automatically log in
    //    }
    //  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Chat setLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
