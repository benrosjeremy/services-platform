// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserRegister from "./components/Auth/UserRegister";
import ProviderRegister from "./components/Auth/ProviderRegister";
import ProviderHome from "./pages/ProviderHome";
import UserHome from "./pages/UserHome";
import LoginPage from "./pages/LoginPage";
import MenuBar from "./components/Auth/Common/MenuBar";

function App() {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null); // שמירת אובייקט המשתמש

  const handleLoginSuccess = (type, userData) => {
    setUserType(type);
    setUser(userData); 
  };

  return (
    <Router>
      <div className="App">
        {/* הצגת MenuBar בכל הדפים */}
        <MenuBar userType={userType} user={user} />
      <Routes>
        {/* ברירת מחדל - עמוד ההתחברות */}
        <Route
          path="/"
          element={
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              userType={userType} user={user}
            />
          }
        />

        {/* מסלולים למשתמשים */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route
          path="/user/home"
          element={userType === "user" ? <UserHome /> : <Navigate to="/" />}
        />

        {/* מסלולים לבעלי מקצוע */}
        <Route path="/provider/register" element={<ProviderRegister />} />
        <Route
          path="/provider/home"
          element={
            userType === "provider" ? <ProviderHome /> : <Navigate to="/" />
          }
        />

        {/* ניתוב לכל שאר העמודים למסך הבית */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
