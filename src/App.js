import React from "react";
import Chat from "./Chat";
import {useState, useEffect} from "react";
import Login from "./Login";


function App() {
const [username, setUsername] = useState("");
useEffect(() => {const storedUsername = localStorage.getItem("username");
 if(storedUsername){
 setUsername(storedUsername);
 }
 },[]);
 const handleLogin =(newUsername) => {
 localStorage.setItem("username",newUsername);
 setUsername(newUsername);
 };
  return (
    <div>
   {username ? <Chat username={username}/> :<Login onLogin={handleLogin}/>}

    </div>
  );
}

export default App;
