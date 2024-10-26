// In your component that displays notifications:
import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import Auth from "../utils/auth";
import "../index.css";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = Auth.getToken(); // Get the token from sessionStorage
    const userId = Auth.getProfile()._id; // Get the user ID

    if (token && userId) {
      // Fetch missed notifications for the logged-in user
      socket.emit("get missed messages", userId);

      // Listen for missed messages
      socket.on("missed messages", (messages) => {
        console.log("Missed messages:", messages);
        setNotifications((prevNotifications) => [...prevNotifications, ...messages]);
      });

      // Listen for real-time chat messages
      socket.on("chat message", (message) => {
        console.log("New chat message:", message);
        setNotifications((prevNotifications) => [...prevNotifications, message]);
      });
    }

    // Cleanup
    return () => {
      socket.off("missed messages");
      socket.off("chat message");
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index}>
            <p>{notification.text}</p>
          </div>
        ))
      ) : (
        <p>No notifications at the moment.</p>
      )}
    </div>
  );
}

export default NotificationsPage;
