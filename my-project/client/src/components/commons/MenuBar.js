// import React from "react";
// import "./MenuBar.css";
// import { Link } from "react-router-dom";

// const MenuBar = ({ userType, user, onLogout }) => {
//   // פונקציה שמחזירה ברכה לפי השעה
//   const getGreeting = () => {
//     const currentHour = new Date().getHours();
//     if (currentHour >= 5 && currentHour < 12) {
//       return "בוקר טוב";
//     } else if (currentHour >= 12 && currentHour < 18) {
//       return "צהריים טובים";
//     } else {
//       return "ערב טוב";
//     }
//   };

//   return (
//     <nav className="menu-bar">
//       <Link to="/" className="logo-link">
//         <h1 className="logo">המקצוען</h1>
//       </Link>
//       {user ? (
//         <>
//           <div className="welcome-message">
//             {userType === "user" ? (
//               <span>
//                 {getGreeting()}{" "}
//                 <span className="user-name">
//                   {user?.first_name + " " + user?.last_name || "משתמש לא מחובר"}
//                 </span>
//               </span>
//             ) : userType === "provider" ? (
//               <span>
//                 {getGreeting()},{" "}
//                 <span className="user-name">
//                   {user?.name || "ספק שירות לא מחובר"}
//                 </span>
//               </span>
//             ) : null}
//           </div>
//           <ul className="menu-items">
//             {userType === "user" && (
//               <>
//                 <li>
//                   <Link to="/user/history">היסטורית בקשות שירות</Link>
//                 </li>
//                 <li>
//                   <Link to="/user/new-request">בקשת שירות חדשה</Link>
//                 </li>
//               </>
//             )}
//             {userType === "provider" && (
//               <li>
//                 <Link to="/provider/requests">
//                   בקשות שממתינות להצעות מחיר
//                 </Link>
//               </li>
//             )}
//             <li className="logout-button">
//               <button onClick={onLogout}>יציאה</button>
//             </li>
//           </ul>
//         </>
//       ) : (
//         <div className="welcome-message">
//           <span>אנא התחבר כדי לגשת למערכת</span>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default MenuBar;
import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";
import { LogOut, Clock, FileText } from "lucide-react";

const MenuBar = ({ userType, user, onLogout }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "בוקר טוב";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "צהריים טובים";
    } else {
      return "ערב טוב";
    }
  };

  return (
    <nav className="menu-bar">
      <Link to="/" className="logo-link">
        <img
          src="/images/logoprint2.png" // להוסיף קובץ לוגו בנתיב זה
          alt="המקצוען"
          className="main-logo-image"
        />
        המקצוען
      </Link>
      {user ? (
        <>
          <div className="welcome-message">
            {userType === "user" ? (
              <span>
                {getGreeting()}{" "}
                <span className="user-name">
                  {user?.first_name + " " + user?.last_name || "משתמש לא מחובר"}
                </span>
              </span>
            ) : userType === "provider" ? (
              <span>
                {getGreeting()},{" "}
                <span className="user-name">
                  {user?.name || "ספק שירות לא מחובר"}
                </span>
              </span>
            ) : null}
          </div>
          <ul className="menu-items">
            {userType === "user" && (
              <>
                <li>
                  <Link to="/user/history" className="link-container">
                    <Clock className="menu-icon" />
                    היסטורית בקשות שירות
                  </Link>
                </li>
                <li>
                  <Link to="/user/new-request" className="link-container">
                    <FileText className="menu-icon" />
                    בקשת שירות חדשה
                  </Link>
                </li>
              </>
            )}
            {userType === "provider" && (
              <li>
                <Link to="/provider/requests" className="link-container">
                  <FileText className="menu-icon" />
                  בקשות שממתינות להצעות מחיר
                </Link>
              </li>
            )}
            <li className="logout-button">
              <button onClick={onLogout} className="link-container">
                <LogOut className="menu-icon" />
                יציאה
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className="welcome-message">
          <span>אנא התחבר כדי לגשת למערכת</span>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
