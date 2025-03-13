/**
 * ChatContext is used to provide and manage the state related to the chat application.
 * It allows components to access and update the current chat room ID and the current user.
 * This context helps in maintaining a global state for the chat application, making it easier
 * to share data between different components without prop drilling.
 */
import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);
  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        setRoomId,
        setCurrentUser,
        connected,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
