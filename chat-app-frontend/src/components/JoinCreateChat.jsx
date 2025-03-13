import React, { use } from "react";
import { useState } from "react";
import chatIcon from "../../icons/chat.png";
import toast from "react-hot-toast";
import { createRoom2, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
export const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();

  const navigate = useNavigate();

  // whenever the field is changed, this function will be called
  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.id]: event.target.value,
    });
  }
  function validateForm() {
    if (detail.userName.trim() === "" || detail.roomId.trim() === "") {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Room joined successfully");
        setConnected(true);
        setRoomId(detail.roomId);
        setCurrentUser(detail.userName);
        navigate("/chat");
      } catch (error) {
        if (error.status == 404) {
          toast.error(error.reponse.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoom2(detail);
        console.log(response);
        toast.success("Room created successfully");
        //join the room
        joinChat();
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room already exists");
        }
        console.log("Error in creating room");
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 border p-10 w-full max-w-md rounded dark:bg-gray-900 shadow dark:border-gray-700 ">
        <div className="flex justify-center">
          <img src={chatIcon} alt="" className="h-12 w-12" />
        </div>

        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room
        </h1>
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2">
            Room ID / New Room ID
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.roomId}
            name="roomId"
            placeholder="Enter your roomId"
            type="text"
            id="roomId"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div className="flex flex-row gap-3 justify-center mt-4">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};
