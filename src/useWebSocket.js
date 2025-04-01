import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
//adding comment for testing
const SOCKET_URL = "https://chat-backend-production-960b.up.railway.app/chat";

export const useWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isConnected, setIsConnected] = useState(false); // Track if WebSocket is connected

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected!");
        setIsConnected(true); // Set to true once connected
        client.subscribe("/topics/messages", (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });

        client.subscribe("/topics/user-validation", (message) => {
          if (message.body === "ERROR: Username already taken") {
            setIsUsernameValid(false);
          } else {
            setIsUsernameValid(true);
            // Store username in localStorage if validation succeeds
            localStorage.setItem("username", localStorage.getItem("pendingUsername"));
          }
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const registerUsername = (username) => {
    if (!isConnected) {
      console.log("Not connected yet. Please wait.");
      return; // Don't attempt to register username before WebSocket is connected
    }

    localStorage.setItem("pendingUsername", username);
     window.location.reload();
    stompClient.publish({
      destination: "/app/register",
      body: username,
    });
  };

  const sendMessage = (content) => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify({ content, sender: localStorage.getItem("username") }),
      });
    }
  };

  return { messages, sendMessage, registerUsername, isUsernameValid, isConnected };
};
