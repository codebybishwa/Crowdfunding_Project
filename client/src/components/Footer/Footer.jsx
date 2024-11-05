import React from 'react';
import './Footer.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-about">
                    <h3 className="site-footer-title">About Us</h3>
                    <p className="site-footer-text">Our mission is to empower creators.</p>
                </div>
                <nav className="site-footer-links">
                    <h3 className="site-footer-title">Quick Links</h3>
                    <ul>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="site-footer-social">
                    <h3 className="site-footer-title">Follow Us</h3>
                    <a href="#" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Meta (Facebook)">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </div>
            </div>
            <div className="site-footer-bottom">
                <p>© 2024 Crowdfunding Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
