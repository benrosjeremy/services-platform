import React, { useState } from 'react';
import axios from 'axios';


const ProviderRegister = () => {
  const [provider, setProvider] = useState({
    name: '', email: '', password: '', phone: '', city: ''
  });

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register-provider', provider);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };
return (
    <div className="auth-container">
      <h2 className="auth-title">Register Provider</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text"
          className="form-input"
          placeholder="Name" 
          onChange={(e) => setProvider({...provider, name: e.target.value})}
        />
        <input 
          type="email"
          className="form-input"
          placeholder="Email" 
          onChange={(e) => setProvider({...provider, email: e.target.value})}
        />
        <input 
          type="password"
          className="form-input"
          placeholder="Password" 
          onChange={(e) => setProvider({...provider, password: e.target.value})}
        />
        <input 
          type="tel"
          className="form-input"
          placeholder="Phone" 
          onChange={(e) => setProvider({...provider, phone: e.target.value})}
        />
        <input 
          type="text"
          className="form-input"
          placeholder="City" 
          onChange={(e) => setProvider({...provider, city: e.target.value})}
        />
        <button className="submit-button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};
export default ProviderRegister;
