// src/components/NavbarSection/NavbarSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NavbarSection.css';

const NavbarSection = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li> {/* Use Link instead of anchor tags */}
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarSection;
