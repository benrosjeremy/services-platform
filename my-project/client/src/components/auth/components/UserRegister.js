import React, { useState } from 'react';
import axios from 'axios';


const UserRegister = () => {
  const [user, setUser] = useState({
    first_name: '', last_name: '', email: '', password: '', phone: ''
  });

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', user);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };
return (
    <div className="auth-container">
      <h2 className="auth-title">Register User</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text"
          className="form-input"
          placeholder="First Name" 
          onChange={(e) => setUser({...user, first_name: e.target.value})}
          value={user.first_name}
        />
        <input 
          type="text"
          className="form-input"
          placeholder="Last Name" 
          onChange={(e) => setUser({...user, last_name: e.target.value})}
          value={user.last_name}
        />
        <input 
          type="email"
          className="form-input"
          placeholder="Email" 
          onChange={(e) => setUser({...user, email: e.target.value})}
          value={user.email}
        />
        <input 
          type="password"
          className="form-input"
          placeholder="Password" 
          onChange={(e) => setUser({...user, password: e.target.value})}
          value={user.password}
        />
        <input 
          type="tel"
          className="form-input"
          placeholder="Phone" 
          onChange={(e) => setUser({...user, phone: e.target.value})}
          value={user.phone}
        />
        <button className="submit-button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};
export default UserRegister;
