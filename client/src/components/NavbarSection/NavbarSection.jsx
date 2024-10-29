// src/components/NavbarSection/NavbarSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarSection.css';

const NavbarSection = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/register">Register</Link></li> {/* Register page */}
      </ul>
    </nav>
  );
};

export default NavbarSection;
