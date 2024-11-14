import React from "react";
import { Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import ProviderLogin from "./components/ProviderLogin";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess, userType }) {
  // ניתוב אוטומטי בהתאם לסוג המשתמש
  if (userType === "user") {
    return <Navigate to="/user/home" />;
  }
  if (userType === "provider") {
    return <Navigate to="/provider/home" />;
  }

  return (
    <div className="login-page">
      <h1 className="login-title">ברוכים הבאים! התחברו לחשבון</h1>
      <div className="login-container">
        <div className="login-box">
          <UserLogin
            onLoginSuccess={(type, user) => onLoginSuccess(type, user)}
          />
          <button className="register-link">
            <a href="/user/register">משתמש חדש? הירשם כאן</a>
          </button>
        </div>

        <div className="login-box">
          <ProviderLogin
            onLoginSuccess={(type, provider) => onLoginSuccess(type, provider)}
          />
          <button className="register-link">
            <a href="/provider/register">בעל מקצוע חדש? הירשם כאן</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
