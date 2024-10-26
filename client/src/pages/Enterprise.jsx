import React from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import "../index.css";

const Enterprise = () => {
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/"); // Redirect to the homepage or login page after logout
  };

  const handleNotificationsClick = () => {
    if (isLoggedIn) {
      navigate("/enterprise/notifications"); // Navigate to notifications page
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
          <LoginSignupModal />
        )}
      </div>

      <div className="dashboard-container">
        <Link to="/enterprise/inventory" className="dashboard-button">
          Inventory Dashboard
        </Link>
        <Link to="/enterprise/pos" className="dashboard-button">
          Point of Sale
        </Link>
        <Link to="/enterprise/reports" className="dashboard-button">
          Sales Reports
        </Link>
        <button
          className="dashboard-button notifications-alert"
          disabled={!isLoggedIn}
          onClick={handleNotificationsClick}
        >
          Notifications
          {isLoggedIn && <span className="alert-icon">!</span>}
        </button>
      </div>

      {!isLoggedIn && (
        <p className="login-reminder">Please log in to view notifications.</p>
      )}
    </div>
  );
};

export default Enterprise;
