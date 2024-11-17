// // App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "./components/auth/components/UserRegister";
import ProviderRegister from "./components/auth/components/ProviderRegister";
import ProviderHome from "./components/home-provider/ProviderHome";
import UserHome from "./components/home-client/UserHome";
import LoginPage from "./components/auth/LoginPage";
import MenuBar from "./components/commons/MenuBar";
import "./App.css";

function App() {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (type, userData) => {
    setUserType(type);
    setUser(userData);
    console.log("User data after login:", userData);
  };

  // פונקציה ליציאה מהמערכת
  const handleLogout = () => {
    setUserType(null);
    setUser(null);
  };

  return (
    // <Router>
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <div className="App">
        <MenuBar userType={userType} user={user} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                userType={userType}
                user={user}
              />
            }
          />

          {/* מסלולים למשתמשים */}
          <Route path="/user/register" element={<UserRegister />} />
          <Route
            path="/user/home"
            element={
              userType === "user" ? (
                <UserHome user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/provider/register" element={<ProviderRegister />} />
          {/* <Route
            path="/provider/home"
            element={
              userType === "provider" ? <ProviderHome /> : <Navigate to="/" />
            }
          /> */}
          <Route
            path="/provider/home"
            element={
              userType === "provider" ? (
                <ProviderHome provider={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* ניתוב לכל שאר העמודים למסך הבית */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {/* </Router> */}
    </BrowserRouter>
  );
}

export default App;
