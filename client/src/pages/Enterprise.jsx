import React from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Enterprise = () => {
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
    </div>
  );
};

export default Enterprise;