import React, { useState, useEffect } from "react";
import socket from "../utils/socket";

const Notifications = ({ onReceiveMessages }) => {
  useEffect(() => {
    // Listen for missed messages
    socket.on("missed messages", (messages) => {
      console.log("Missed messages received in Notifications component:", messages);
      if (messages && messages.length > 0) {
        onReceiveMessages(messages);
      }
    });

    // Listen for chat messages (if the recipient is online)
    socket.on("chat message", (message) => {
      console.log("Chat message received in Notifications component:", message);
      onReceiveMessages([message]);
    });

    // Clean up listeners when the component unmounts
    return () => {
      socket.off("missed messages");
      socket.off("chat message");
    };
  }, [onReceiveMessages]);

  return null;
};

export default Notifications;
