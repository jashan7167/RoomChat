import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import { Chat } from "../components/Chat";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  );
};
