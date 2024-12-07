// // import React from "react";
// import "./MenuBar.css";
// import { Link } from "react-router-dom";

// const MenuBar = ({ userType, user, onLogout }) => {
//   return (
//     <nav className="menu-bar">
//       <Link to="/user/home" className="logo-link">
//         <h1 className="logo">המקצוען</h1>
//       </Link>
//       {user ? (
//         <>
//           <div className="welcome-message">
//             {userType === "user" ? (
//               <span>
//                 שלום,{" "}
//                 <span className="user-name">
//                   {user?.first_name + " " + user?.last_name || "משתמש לא מחובר"}
//                 </span>
//               </span>
//             ) : userType === "provider" ? (
//               <span>
//                 שלום,{" "}
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
import "./MenuBar.css";
import { Link } from "react-router-dom";

const MenuBar = ({ userType, user, onLogout }) => {
  // פונקציה שמחזירה ברכה לפי השעה
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
        <h1 className="logo">המקצוען</h1>
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
                  <Link to="/user/history">היסטורית בקשות שירות</Link>
                </li>
                <li>
                  <Link to="/user/new-request">בקשת שירות חדשה</Link>
                </li>
              </>
            )}
            {userType === "provider" && (
              <li>
                <Link to="/provider/requests">
                  בקשות שממתינות להצעות מחיר
                </Link>
              </li>
            )}
            <li className="logout-button">
              <button onClick={onLogout}>יציאה</button>
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
