import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to, label = "Back to Dashboard" }) => {
  const navigate = useNavigate();
  return (
    <button
      className="button-common enterprise-button"
      onClick={() => navigate(to)}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </button>
  );
};

export default BackButton;
