import { useEffect, useState } from "react";
import socket from "../utils/socket"; // Use the shared socket

function Notifications({ onNewNotification }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for incoming chat notifications
    socket.on("chat message", (messageData) => {
      const newNotification = {
        type: "chat",
        content: `New message from ${messageData.from}`,
        timestamp: new Date(),
      };

      // Trigger callback when a new notification is received
      handleNewNotification(newNotification);
    });

    // Listen for report notifications or other events (example)
    socket.on("new report", (reportData) => {
      const newNotification = {
        type: "report",
        content: `New report generated: ${reportData.title}`,
        timestamp: new Date(),
      };

      handleNewNotification(newNotification);
    });

    return () => {
      // Clean up socket listeners when component unmounts
      socket.off("chat message");
      socket.off("new report");
    };
  }, []);

  const handleNewNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
    if (onNewNotification) {
      onNewNotification(notification); // Propagate the new notification if a callback is provided
    }
  };

  return null; // No UI rendering
}

export default Notifications;
