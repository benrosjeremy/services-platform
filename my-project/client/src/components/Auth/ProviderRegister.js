import React, { useState } from 'react';
import axios from 'axios';

const ProviderRegister = () => {
  const [provider, setProvider] = useState({
    name: '', email: '', password: '', phone: '', city: ''
  });

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/provider-register', provider);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Provider</h2>
      <input placeholder="Name" onChange={(e) => setProvider({...provider, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setProvider({...provider, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setProvider({...provider, password: e.target.value})} />
      <input placeholder="Phone" onChange={(e) => setProvider({...provider, phone: e.target.value})} />
      <input placeholder="City" onChange={(e) => setProvider({...provider, city: e.target.value})} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default ProviderRegister;
