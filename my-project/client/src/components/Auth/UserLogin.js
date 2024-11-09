// UserLogin.js
import React, { useState } from "react";
import axios from "axios";


const UserLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data; // האובייקט של המשתמש
      onLoginSuccess("user", user); // מעביר את כל האובייקט
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
      alert("Invalid login: " + error);
    }
  };

//   return (
//     <div>
//       <h2>User Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };
return (
    <div className="auth-container">
      <h2 className="auth-title">User Login</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
