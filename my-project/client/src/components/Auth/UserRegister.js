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
    <div>
      <h2>Register User</h2>
      <input placeholder="First Name" onChange={(e) => setUser({...user, first_name: e.target.value})} />
      <input placeholder="Last Name" onChange={(e) => setUser({...user, last_name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setUser({...user, password: e.target.value})} />
      <input placeholder="Phone" onChange={(e) => setUser({...user, phone: e.target.value})} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserRegister;
