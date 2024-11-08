// src/components/MenuBar.js
import React from "react";
import "./MenuBar.css"; // סגנונות נפרדים

const MenuBar = ({ userType, userName }) => {
  return (
    <nav className="menu-bar">
      <h1 className="logo">My Website</h1>
      {userType ? (
        <div className="welcome-message">
          <span>שלום, {userName} </span>
        </div>
      ) : (
        <div className="welcome-message">
          <span>ברוך הבא, אנא התחבר</span>
        </div>
      )}
      <ul className="menu-items">
        {userType === "user" && (
          <>
            <li>
              <Link to="/user/history">היסטורית בקשות שירות</Link>
            </li>
            <li>
              <Link to="/user/new-request">בקשת שירות חדשה</Link>
            </li>
          </>
        )}

        {userType === "provider" && (
          <li>
            <Link to="/provider/requests">בקשות שממתינות להצעות מחיר</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MenuBar;
