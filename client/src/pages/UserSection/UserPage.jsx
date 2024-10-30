// src/components/UserPage/UserPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [projectsCreated, setProjectsCreated] = useState([]);
  const [donatedProjects, setDonatedProjects] = useState([]);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust based on your storage choice
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        // Fetch the user information
        const userResponse = await axios.get(`http://localhost:3000/profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request header
          }
        });

        const userData = userResponse.data;
        console.log(userData);
        setUser(userData);
        setProjectsCreated(userData.createdProjects || []); // Safely set created projects
        setDonatedProjects(userData.donatedProjects || []); // Safely set donated projects
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // No dependencies needed; it runs once on component mount

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-section">
      <div className="user-details">
        <h2>{user.fullName}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>

      <div className="projects-section">
        <h3>Projects Created by {user.fullName}</h3>
        <div className="projects-list">
          {projectsCreated.length > 0 ? (
            projectsCreated.map((project) => (
              <div key={project._id} className="project-card">
                <img src={project.image || 'https://via.placeholder.com/300'} alt={project.name} />
                <div className="project-info">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <p>
                    <strong>Funds Raised:</strong> ${project.currentAmount} / ${project.requiredAmount}
                  </p>
                  <p>
                    <strong>Funders:</strong> {project.funders.join(', ')}
                  </p>
                  <Link to={`/projects/${project._id}`} className="project-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No projects created yet.</p>
          )}
        </div>
      </div>

      <div className="donated-section">
        <h3>Projects {user.fullName} Donated To</h3>
        <div className="projects-list">
          {donatedProjects.length > 0 ? (
            donatedProjects.map((project) => (
              <div key={project._id} className="project-card">
                <img src={project.image || 'https://via.placeholder.com/300'} alt={project.name} />
                <div className="project-info">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <p>
                    <strong>Funds Raised:</strong> ${project.currentAmount} / ${project.requiredAmount}
                  </p>
                  <p>
                    <strong>Funders:</strong> {project.funders.join(', ')}
                  </p>
                  <Link to={`/projects/${project._id}`} className="project-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No projects donated to yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
