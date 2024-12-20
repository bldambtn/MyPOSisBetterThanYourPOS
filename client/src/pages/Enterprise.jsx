import React, { useState, useEffect } from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import "../index.css";
import socket from '../utils/socket';

const Enterprise = () => {
  // const isLoggedIn = Auth.loggedIn();
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

  const handleLogout = () => {
    Auth.logout();
    navigate("/");
  };

  const handleNotificationsClick = () => {
    if (isLoggedIn) {
      navigate("/enterprise/notifications");
    }
  };

  return (
    <div className="enterprise-page">
      <h1 className="merriweather-bold">Dashboard</h1>
      {/* Login/Logout Button in the top-right corner */}
      <div className="top-right-button">
        {isLoggedIn ? (
          <button className="enterprise-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <LoginSignupModal onLogin={handleLogin}/>
        )}
      </div>

      <div className={`dashboard-container ${!isLoggedIn ? "blur" : ""}`}>
        <Link
          to="/enterprise/inventory"
          className="dashboard-button"
          disabled={!isLoggedIn}
        >
          Inventory Dashboard
        </Link>
        <Link
          to="/enterprise/pos"
          className="dashboard-button"
          disabled={!isLoggedIn}
        >
          Point of Sale
        </Link>
        <Link
          to="/enterprise/reports"
          className="dashboard-button"
          disabled={!isLoggedIn}
        >
          Sales Reports
        </Link>
        <button
          className="dashboard-button notifications-alert"
          onClick={handleNotificationsClick}
          disabled={!isLoggedIn}
        >
          Notifications
          {isLoggedIn && <span className="alert-icon">!</span>}
        </button>
      </div>

      {/* Overlay for logged-out users */}
      {!isLoggedIn && (
        <div className="logged-out-overlay">
          <p className="login-message">
            Please log in or sign up to view your dashboard
          </p>
        </div>
      )}
    </div>
  );
};

export default Enterprise;
