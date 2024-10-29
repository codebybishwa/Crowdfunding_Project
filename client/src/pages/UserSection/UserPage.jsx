// src/components/UserPage/UserPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Passionate about community development and sustainable projects.',
  };

  const projectsCreated = [
    {
      id: 1,
      name: 'Community Garden',
      description: 'Help us grow fresh produce for local families.',
      image: 'https://via.placeholder.com/300',
      requiredAmount: 5000,
      currentAmount: 3000,
      funders: ['Alice Johnson', 'Bob Smith'],
      documentation: ['garden-plan.pdf', 'garden-image.jpg'],
    },
    {
      id: 2,
      name: 'School Supplies Drive',
      description: 'Providing essential supplies for underprivileged children.',
      image: 'https://via.placeholder.com/300',
      requiredAmount: 7000,
      currentAmount: 5000,
      funders: ['Sarah Connor', 'John Wick'],
      documentation: ['supplies-list.pdf', 'school-event.jpg'],
    },
  ];

  const donatedProjects = [
    {
      id: 3,
      name: 'Clean Water Initiative',
      description: 'Supporting clean water access in rural areas.',
      image: 'https://via.placeholder.com/300',
      requiredAmount: 10000,
      currentAmount: 8000,
      funders: ['Emily Rose', 'Clark Kent'],
      documentation: ['water-plan.pdf', 'village-photo.jpg'],
    },
    {
      id: 4,
      name: 'Tree Plantation Drive',
      description: 'Let’s make the world greener by planting trees.',
      image: 'https://via.placeholder.com/300',
      requiredAmount: 6000,
      currentAmount: 4000,
      funders: ['Bruce Wayne', 'Diana Prince'],
      documentation: ['plantation-details.pdf', 'event-photo.jpg'],
    },
  ];

  return (
    <div className="user-section">
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>

      <div className="projects-section">
        <h3>Projects Created by {user.name}</h3>
        <div className="projects-list">
          {projectsCreated.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.name} />
              <div className="project-info">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p>
                  <strong>Funds Raised:</strong> ${project.currentAmount} / $
                  {project.requiredAmount}
                </p>
                <p>
                  <strong>Funders:</strong> {project.funders.join(', ')}
                </p>
                <Link to={`/profile/projects/${project.id}`} className="project-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="donated-section">
        <h3>Projects {user.name} Donated To</h3>
        <div className="projects-list">
          {donatedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.name} />
              <div className="project-info">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p>
                  <strong>Funds Raised:</strong> ${project.currentAmount} / $
                  {project.requiredAmount}
                </p>
                <p>
                  <strong>Funders:</strong> {project.funders.join(', ')}
                </p>
                <Link to={`/profile/projects/${project.id}`} className="project-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
