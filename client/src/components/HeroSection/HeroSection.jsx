// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Import the CSS file for styles
import gif from './Untitled design.gif'; // Update with your GIF path

const HeroSection = () => {
    return (
      <div className="landing-container">
        {/* Full-width GIF */}
        <img
          src={gif}
          alt="Crowdfunding"
          className="landing-gif"
        />
        
        {/* Content on the Left Side */}
        <div className="content-container">
          <h1 className="tagline">
            Empowering Dreams Through Crowdfunding...
          </h1>
          <div className="button-container">
            <button className="btn">Get Started</button>
            <button className="btn">Explore Projects</button>
            <button className="create-project-btn">Create a Project</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;