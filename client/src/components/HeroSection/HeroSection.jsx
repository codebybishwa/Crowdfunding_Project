// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Import the CSS file for styles
import gif from './Untitled design.gif'; // Update with your GIF path

const HeroSection = () => {
  const navigate = useNavigate();

  // Function to handle Explore Projects button click
  const handleExploreProjects = () => {
    navigate('/projects');
  };

  // Function to handle Create Project button click
  const handleCreateProject = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login'); // Redirect to login if user is not authenticated
    } else {
      navigate('/createProject'); // Redirect to create project if user is authenticated
    }
  };

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
          <button className="btn" onClick={() => navigate('/getStarted')}>Get Started</button>
          <button className="btn" onClick={handleExploreProjects}>Explore Projects</button>
          <button className="create-project-btn" onClick={handleCreateProject}>Create a Project</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
