import { useState } from "react";
import Notifications from "../components/Notifications";
import "../index.css";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const handleNewNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            {notif.content} <br />
            <small>{new Date(notif.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <Notifications onNewNotification={handleNewNotification} />
    </div>
  );
}

export default NotificationsPage;
