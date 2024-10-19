import React from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from '../utils/auth';

const Enterprise = () => {
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in
  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    if (isLoggedIn) {
      navigate("/enterprise/notifications"); // Navigate to notifications page
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <LoginSignupModal />

      <div className="mt-4">
        <Link to="/enterprise/inventory" className="btn btn-primary mr-2">
          Go to Inventory
        </Link>
        <Link to="/enterprise/pos" className="btn btn-secondary">
          Go to Point of Sale
        </Link>
      </div>

      {/* Notifications Button */}
      <div className="mt-4">
        <button
          className="btn btn-warning"
          disabled={!isLoggedIn}
          onClick={handleNotificationsClick} // Navigate to notifications
        >
          Notifications
        </button>
        {!isLoggedIn && <p>Please log in to view notifications.</p>}
        {/* Message for logged-out users */}
      </div>
    </div>
  );
};

export default Enterprise;