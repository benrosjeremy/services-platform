// // // App.js
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import UserRegister from "./components/auth/components/UserRegister";
// import ProviderRegister from "./components/auth/components/ProviderRegister";
// import ProviderHome from "./components/home-provider/ProviderHome";
// import UserHome from "./components/home-client/UserHome";
// import LoginPage from "./components/auth/LoginPage";
// import ClientRequestsHistory from "./components/home-client/history/history";
// import MenuBar from "./components/commons/MenuBar";
// import "./App.css";

// function App() {
//   const [userType, setUserType] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const storedUser = localStorage.getItem("user");
//     const userType = localStorage.getItem("userType");

//     if (token && storedUser) {
//       setUserType(userType); // או תוכל להוסיף לוגיקה לבדוק אם מדובר ב-"provider"
//       setUser(JSON.parse(storedUser)); // שחזור המידע של המשתמש
//     }
//   }, []);

//   const handleLoginSuccess = (type, userData) => {
//     setUserType(type);
//     setUser(userData);

//     console.log("User data after login:", userData);
//   };

//   // פונקציה ליציאה מהמערכת
//   const handleLogout = () => {
//     // נקה את ה-TOKEN והמשתמש ב-localStorage
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     setUserType(null);
//     setUser(null);
//   };

//   return (
//     // <Router>
//     <BrowserRouter
//       future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
//     >
//       <div className="App">
//         <MenuBar userType={userType} user={user} onLogout={handleLogout} />

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <LoginPage
//                 onLoginSuccess={handleLoginSuccess}
//                 userType={userType}
//                 user={user}
//               />
//             }
//           />

//           {/* מסלולים למשתמשים */}
//           <Route path="/user/register" element={<UserRegister />} />
//           <Route
//             path="/user/home"
//             element={
//               userType === "user" ? (
//                 <UserHome user={user} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/user/history"
//             element={
//               userType === "user" ? (
//                 <ClientRequestsHistory clientId={user} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           <Route path="/provider/register" element={<ProviderRegister />} />
//           {/* <Route
//             path="/provider/home"
//             element={
//               userType === "provider" ? <ProviderHome /> : <Navigate to="/" />
//             }
//           /> */}
//           <Route
//             path="/provider/home"
//             element={
//               userType === "provider" ? (
//                 <ProviderHome provider={user} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />

//           {/* ניתוב לכל שאר העמודים למסך הבית */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//       {/* </Router> */}
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./components/auth/components/UserRegister";
import ProviderRegister from "./components/auth/components/ProviderRegister";
import ProviderHome from "./components/home-provider/ProviderHome";
import UserHome from "./components/home-client/UserHome";
import LoginPage from "./components/auth/LoginPage";
import ClientRequestsHistory from "./components/home-client/history/history";
import MenuBar from "./components/commons/MenuBar";
import "./App.css";

function App() {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  // שימוש ב-useEffect כדי לשחזר את המידע מ-localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType");

    // אם יש Token והמשתמש קיים ב-localStorage
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserType(storedUserType); // הגדרת סוג המשתמש
        setUser(parsedUser); // שחזור המידע של המשתמש
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLoginSuccess = (type, userData) => {
    setUserType(type); // הגדרת סוג המשתמש
    setUser(userData); // שמירת המידע של המשתמש

    // שמירה ב-localStorage
    localStorage.setItem("authToken", "someAuthToken"); // שמור את ה-Token
    localStorage.setItem("user", JSON.stringify(userData)); // שמור את המידע של המשתמש
    localStorage.setItem("userType", type); // שמור את סוג המשתמש (user או provider)

    console.log("User data after login:", userData);
  };
  

  // פונקציה ליציאה מהמערכת
  const handleLogout = () => {
    // נקה את ה-TOKEN והמשתמש ב-localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userType"); // נקה את ה-userType
    setUserType(null);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <MenuBar userType={userType} user={user} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              userType ? (
                <Navigate to={`/${userType}/home`} /> // אם יש התחברות, נוודא שהמשתמש יועבר לדף הבית המתאים
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* מסלולים למשתמשים */}
          <Route path="/user/register" element={<UserRegister />} />
          <Route
            path="/user/home"
            element={
              userType === "user" ? <UserHome user={user} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/user/history"
            element={
              userType === "user" ? (
                <ClientRequestsHistory clientId={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/provider/register" element={<ProviderRegister />} />
          <Route
            path="/provider/home"
            element={
              userType === "provider" ? <ProviderHome provider={user} /> : <Navigate to="/" />
            }
          />    

          {/* ניתוב לכל שאר העמודים למסך הבית */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
