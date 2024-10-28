import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-about">
                    <h3>About Us</h3>
                    <p>Our mission is to empower creators.</p>
                </div>
                <nav className="footer-nav">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="footer-social-media">
                    <h3>Follow Us</h3>
                    <a href="#" aria-label="Instagram">Instagram</a>
                    <a href="#" aria-label="LinkedIn">LinkedIn</a>
                    <a href="#" aria-label="Twitter">Twitter</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Crowdfunding Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
