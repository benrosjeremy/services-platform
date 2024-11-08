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
      if (response.status === 200) {
        const provider = response.data; // האובייקט של המשתמש
        onLoginSuccess("provider", provider.provider);
        console.log("Provider:", provider);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
      alert("Invalid login" + error);
    }
  };

  return (
    <div>
      <h2>Provider Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default ProviderLogin;
