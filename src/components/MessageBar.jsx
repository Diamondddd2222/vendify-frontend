import React from "react";
import "./MessageBar.css";

const MessageBar = ({ type, message }) => {
  if (!message) return null;

  return (
    // <div className={`message-bar ${type === "success" ? "success" : "error"}`}>
    <div className={`message-bar ${
  type === "success" ? "success" :
  type === "error" ? "error" :
  type === "pending" ? "pending" : ""
}`}>
      <p>{message}</p>
    </div>
  );
};

export default MessageBar;
