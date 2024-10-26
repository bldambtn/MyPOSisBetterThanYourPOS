import React, { useState, useEffect } from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import LogoutButton from "../components/LogoutButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import socket from '../utils/socket';
import "../index.css";

const Enterprise = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(Auth.loggedIn());
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    socket.connect(); // Reconnect the socket if needed
  };

  const handleNotificationsClick = () => {
    if (isLoggedIn) {
      navigate("/enterprise/notifications");
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <LoginSignupModal onLogin={handleLogin} />

      <div className="mt-4">
        <Link to="/enterprise/inventory" className="btn btn-primary mr-2">
          Go to Inventory Dashboard
        </Link>
        <Link to="/enterprise/pos" className="btn btn-secondary mr-2">
          Go to Point of Sale
        </Link>
        <Link to="/enterprise/reports" className="btn btn-info">
          View Sales Reports
        </Link>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-warning"
          disabled={!isLoggedIn}
          onClick={handleNotificationsClick}
        >
          Notifications
        </button>
        {!isLoggedIn && <p>Please log in to view notifications.</p>}
      </div>

      {isLoggedIn && (
        <div className="mt-4">
          <LogoutButton onLogout={() => setIsLoggedIn(false)} />
        </div>
      )}
    </div>
  );
};

export default Enterprise;
