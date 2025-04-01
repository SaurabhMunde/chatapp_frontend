import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "https://chat-backend-production-960b.up.railway.app/chat";

export const useWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected!");
        client.subscribe("/topics/messages", (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });

        client.subscribe("/topics/user-validation", (message) =>{
        if(message.body === "Error: Username already taken"){
        setIsUsernameValid(false);
        else{
        setIsUsernameValid(true);
        localStorage.setItem("username",localStorage.getItem("pendingUsername"));
        }
        }
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

   const registerUsername = (username) => {
      localStorage.setItem("pendingUsername", username);
      stompClient.publish({
        destination: "/app/register",
        body: username,
      });
    };

  const sendMessage = (content) => {
    if (stompClient) {
      const username = localStorage.getItem("username") || "Anonymous"; // Get saved username
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify({ content, sender: username }),
      });
    }
  };

  return { messages, sendMessage, registerUsername, isUsernameValid };
};