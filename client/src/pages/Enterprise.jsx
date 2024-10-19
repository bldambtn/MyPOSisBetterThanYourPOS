import React from "react";
import LoginSignupModal from "../components/LoginSignupModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import TitleBanner from "../components/TitleBanner";

const Enterprise = () => {
  return (
    <div className="container">

      <h1>Dashboard</h1>
      <LoginSignupModal />
    </div>
  );
};

export default Enterprise;
