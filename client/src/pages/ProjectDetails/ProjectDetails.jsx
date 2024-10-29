import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id); 

  const projects = [
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
      name: 'Library Expansion',
      description: 'Expanding the community library.',
      image: 'https://via.placeholder.com/300', 
      requiredAmount: 12000,
      currentAmount: 8000,
      funders: ['Charlie Davis'],
      documentation: ['library-plan.pdf', 'library-image.jpg'],
    },
    {
      id: 3,
      name: 'Youth Sports Equipment',
      description: 'Providing sports equipment for underprivileged youth.',
      image: 'https://via.placeholder.com/300', 
      requiredAmount: 8000,
      currentAmount: 2000,
      funders: ['David Brown', 'Emma Wilson'],
      documentation: ['sports-plan.pdf', 'sports-image.jpg'],
    },
    {
      id: 4,
      name: 'Youth Sports Equipment',
      description: 'Providing sports equipment for underprivileged youth.',
      image: 'https://via.placeholder.com/300', 
      requiredAmount: 8000,
      currentAmount: 2000,
      funders: ['David Brown', 'Emma Wilson'],
      documentation: ['sports-plan.pdf', 'sports-image.jpg'],
    }
  ];

  
  const project = projects.find((p) => p.id === projectId);

  
  if (!project) {
    return <div>Project not found.</div>;
  }

  const progress = (project.currentAmount / project.requiredAmount) * 100;

  return (
    <div className="project-detail">
      <h1>{project.name}</h1>
      <img src={project.image} alt={project.name} className="project-detail-image" /> {/* Project image */}
      <p className="project-description">{project.description}</p>

      <div className="project-info">
        <div className="funding-details">
          <p>Required Amount: ${project.requiredAmount}</p>
          <p>Current Funding: ${project.currentAmount}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress.toFixed(2)}% funded</p>
        </div>

        <div className="funders">
          <h3>Funders</h3>
          <ul>
            {project.funders.map((funder, index) => (
              <li key={index}>{funder}</li>
            ))}
          </ul>
        </div>

        <div className="documentation">
          <h3>Official Documentation</h3>
          <ul>
            {project.documentation.map((doc, index) => (
              <li key={index}>
                <a href={`path/to/${doc}`} target="_blank" rel="noopener noreferrer">
                  {doc}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
