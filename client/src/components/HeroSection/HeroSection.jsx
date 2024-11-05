import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Import the CSS file for styles
import video from './home vid.mp4'; // Update with your video path

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreProjects = () => {
    navigate('/projects');
  };

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
      <video
        src={video}
        className="landing-video"
        autoPlay
        loop
        muted
        playsInline // For mobile compatibility
      ></video>

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
