import {useState} from "react";

function Login({onLogin}){
const [username, setUsername] = useState("");
const handleLogin = () => {
if(!username.trim()){
alert("please enter a username");
return;
}
localStorage.setItem("username", username);
onLogin(username);
};

return (
<div className = "login-container">
<h2>Enter a Username</h2>
<input type ="text"
placeholder = "username"
value = {username}
onChange={(e) => setUsername(e.target.value)}
/>
<button onClick={handleLogin}>Join chat</button>
</div>
);
}
export default Login;