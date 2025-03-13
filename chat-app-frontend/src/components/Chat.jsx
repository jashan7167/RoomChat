import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getMessages } from "../services/RoomService";
import { timeAgo } from "../services/timeago";

export const Chat = () => {
  const {
    roomId,
    currentUser,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();
  console.log(roomId, currentUser, connected);

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");

  //scrolldown

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //load old messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessages(roomId);
        console.log(messages);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, [roomId]);

  // stomp client init
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/chat");
      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          console.log("Connected to WebSocket");
          setStompClient(client);
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, JSON.parse(message.body)]);
          });
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
    };

    if (connected) {
      const client = connectWebSocket();
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (stompClient && connected && input.trim() !== "") {
      const message = {
        sender: currentUser,
        content: input,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput(""); // Clear the input field after sending the message
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <div className="">
      {/* Header section - contains room info, user info and leave button */}
      <header className="fixed w-full first:dark:border-gray-700 border dark:bg-gray-900 py-3 shadow flex justify-around items-center">
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span> {/* Room name display */}
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span> {/* Current user display */}
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-600 dark:hover:bg-red-700 px-3 py-3 rounded-full"
          >
            Leave Room {/* Button to exit the current chat room */}
          </button>
        </div>
      </header>

      {/* Main chat area - displays all messages with scrolling */}
      <main
        ref={chatBoxRef}
        className="py-20 px-2 border w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto"
      >
        {/* Map through messages array to render each message bubble */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-start" : "justify-end"
            }`}
          >
            {/* Message bubble with border, background color and rounded styling */}
            <div
              className={`border my-2 ${
                message.sender === currentUser ? "bg-blue-500" : "bg-red-300"
              } p-2 max-w-xs rounded-lg`}
            >
              <div className="flex flex-row gap-3 mb-1">
                {/* User avatar - currently using a placeholder service */}
                <img
                  src={"https://avatar.iran.liara.run/public/4"}
                  alt=""
                  className="h-10"
                />
                <div className="flex flex-col gap-2">
                  {/* Sender name display */}
                  <p className="text-sm font-bold">{message.sender}</p>
                  {/* Message content */}
                  <p>{message.content}</p>
                </div>
              </div>
              <p className="text-xs">{timeAgo(message.time)}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Message input section - fixed at bottom of screen */}
      <div className="fixed bottom-0 w-full h-16">
        {/* Input container with rounded styling */}
        <div className="h-full pr-4 flex gap-4 items-center justify-between rounded-full border w-2/3 mx-auto dark:bg-gray-900">
          {/* Text input for message content */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="dark:border-gray-700 dark:bg-gray-900 px-5 py-2 rounded-full h-full w-full focus:outline-none"
          />
          <div className="flex gap-2">
            {/* File attachment button */}
            <button className="dark:bg-blue-600 h-10 w-12 flex justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            {/* Send message button */}
            <button
              onClick={handleSendMessage}
              className="dark:bg-green-600 h-10 w-12 flex justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
