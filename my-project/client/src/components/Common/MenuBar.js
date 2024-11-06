// src/components/MenuBar.js
import React from 'react';
import './MenuBar.css'; // סגנונות נפרדים

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <h1 className="logo">My Website</h1>
      <ul className="menu-items">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default MenuBar;
