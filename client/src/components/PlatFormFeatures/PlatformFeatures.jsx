import React from 'react';
import './PlatformFeatures.css'; // Ensure to import the CSS file
import platformImage from './image.png'; // Update with your image path

const PlatformFeatures = () => {
    return (
        <section id="platform-features" className="platform-features">
            <h2>Why Choose Us?</h2>
            <div className="features-container">
                <div className="features-text">
                    <ul>
                        <li>Web3 Integration: Fund projects using crypto.</li>
                        <li>Verified Projects: Strict verification process.</li>
                        <li>Transparent Funding: Smart contract integration for secure transactions.</li>
                        <li>Reward System: Earn perks for contributions.</li>
                        <li>Global Community: Accessible for users worldwide.</li>
                    </ul>
                </div>
                <div className="features-image">
                    <img src={platformImage} alt="Platform Features" className="platform-image" />
                </div>
            </div>
        </section>
    );
};

export default PlatformFeatures;
