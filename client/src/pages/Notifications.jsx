import React from "react";

const Notifications = () => {
  return (
    <div className="container">
      <h1>Notifications</h1>
      <div>
        {/* You can separate different sections */}
        <section>
          <h2>Previous Chats</h2>
          <ul>
            {/* Placeholder for previous chats */}
            <li>No previous chats</li>
          </ul>
        </section>

        <section>
          <h2>Missed Chats</h2>
          <ul>
            {/* Placeholder for missed chats */}
            <li>No missed chats</li>
          </ul>
        </section>

        <section>
          <h2>Report Alerts</h2>
          <ul>
            {/* Placeholder for report alerts */}
            <li>No report alerts</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Notifications;
