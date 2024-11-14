// LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // ניתוב לעמוד הבית או ההתחברות לאחר יציאה
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
