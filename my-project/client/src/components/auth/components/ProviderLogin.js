import React, { useState } from "react";
import axios from "axios";

const ProviderLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login-provider",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data; // תקבל את ה-TOKEN ואת אובייקט המשתמש מהשרת

      // שמור את ה-TOKEN ב-localStorage
      localStorage.setItem("authToken", token);

      // שמור את המידע על המשתמש (לא חובה אם לא נדרש)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", "provider");
      // עדכן את הסטייט בצד הלקוח
      onLoginSuccess("provider", user); // מעביר את כל האובייקט של המשתמש

      console.log("Provider:", user);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
      alert("Invalid login" + error);
    }
  };
  //   return (
  //     <div>
  //       <h2>Provider Login</h2>
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
      <h2 className="auth-title">Provider Login</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="submit-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
export default ProviderLogin;
