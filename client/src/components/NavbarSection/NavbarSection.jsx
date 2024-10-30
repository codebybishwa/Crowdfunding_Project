import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarSection.css';

const NavbarSection = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Optionally, you can clear any user data stored in localStorage
    // localStorage.removeItem('userData');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>

        {/* Conditionally render Register and Login links */}
        {!isAuthenticated ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarSection;
