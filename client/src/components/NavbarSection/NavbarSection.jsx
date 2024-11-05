import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faBars } from '@fortawesome/free-solid-svg-icons';
import './NavbarSection.css';

const NavbarSection = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHandHoldingHeart} style={{ marginRight: '8px', verticalAlign: 'middle', color: '#4a90e2' }} />
        UnityFund
      </div>
      
      {/* Hamburger icon for mobile view */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      
      <ul className={`navbar-links ${menuOpen ? 'navbar-links-active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>
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





// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
// import './NavbarSection.css';

// const NavbarSection = () => {
//   const navigate = useNavigate();
//   const isAuthenticated = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <FontAwesomeIcon icon={faHandHoldingHeart} style={{ marginRight: '8px', verticalAlign: 'middle', color: '#4a90e2' }} />
//         UnityFund
//       </div>
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/projects">Projects</Link></li>
//         <li><Link to="/profile">Profile</Link></li>
//         {!isAuthenticated ? (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         ) : (
//           <li>
//             <button onClick={handleLogout} className="logout-button">Logout</button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavbarSection;
