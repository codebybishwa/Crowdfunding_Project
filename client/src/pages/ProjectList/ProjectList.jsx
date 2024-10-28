import React from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";

const projects = [
  {
    id: 1,
    name: "Community Garden",
    description: "Help us grow fresh produce for local families.",
    creator: "Alice Johnson",
    initiationDate: "2024-01-15",
    requiredAmount: 5000,
    currentAmount: 3000,
    image: "https://via.placeholder.com/150",
    funders: ["John", "Alex", "Maria"],
    documentation: ["doc1.pdf", "doc2.jpg"],
  },
  {
    id: 2,
    name: "Library Expansion",
    description: "Expanding the community library.",
    creator: "Bob Smith",
    initiationDate: "2024-02-20",
    requiredAmount: 12000,
    currentAmount: 8000,
    image: "https://via.placeholder.com/150",
    funders: ["Sarah", "Ben"],
    documentation: ["library-doc.pdf"],
  },
  {
    id: 3,
    name: "Youth Sports Equipment",
    description: "Providing sports equipment for underprivileged youth.",
    creator: "Charlie Davis",
    initiationDate: "2024-03-10",
    requiredAmount: 8000,
    currentAmount: 5000,
    image: "https://via.placeholder.com/150",
    funders: ["Alice", "Charlie"],
    documentation: ["sports-equipment.pdf"],
  },
];

const ProjectList = () => {
  return (
    <div className="project-list">
      <h1>Our Projects</h1>
      <ul className="project-list-container">
        {projects.map((project) => (
          <li key={project.id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-details">
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <Link to={`/projects/${project.id}`} className="project-link">View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
