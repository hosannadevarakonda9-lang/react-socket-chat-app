import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const username = prompt("Enter your name");
    socket.emit("join", username || "Guest");

    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on("system_message", (data) => {
      setMessages(prev => [...prev, { ...data, type: "system" }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("system_message");
    };
  }, []);

  const sendMessage = (text) => {
    const messageData = {
      text,
      time: new Date().toLocaleTimeString(),
      type: "sent"
    };

    setMessages(prev => [...prev, messageData]);
    socket.emit("send_message", messageData);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={messages} endRef={messagesEndRef} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default App;
