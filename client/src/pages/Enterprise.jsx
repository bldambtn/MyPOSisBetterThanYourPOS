import React from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Enterprise = () => {
  return (
    <div className="container">
      <h1>Welcome to the Enterprise Page</h1>
      <p>Hello World!</p>
      <LoginModal />
      <SignupModal/>
      <h1 className="title-banner">Welcome to Our Application</h1>
      <div className="button-container">
        <Link to="/enterprise">
          <button className="enterprise-button">Enterprise</button>
        </Link>
        <button className="marketplace-button" disabled>
          Marketplace (coming soon)
        </button>
      </div>
    </div>
  );
};

export default Enterprise;
