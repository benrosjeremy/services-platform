import React from "react";
import "./MenuBar.css"; // סגנונות נפרדים
import { Link } from "react-router-dom";

const MenuBar = ({ userType, user }) => {
  return (
    
    
    <nav className="menu-bar">
      <h1 className="logo">My Website</h1>
      {userType === "user" ? (
        <div className="welcome-message">
          <span>
            שלום, {user?.first_name + " " + user?.last_name || "משתמש לא מחובר"}
          </span>
        </div>
      ) : userType === "provider" ? (
        <span>שלום, {user?.name || "ספק שירות לא מחובר"}</span>
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
