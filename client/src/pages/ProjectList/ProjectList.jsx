import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  
  const capitalizeFirstLetter = (string) => {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    // Fetch projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects");
        // console.log(response);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h1>Our Projects</h1>
      <ul className="project-list-container">
        {projects.map((project) => (
          <li key={project._id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-details">
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <p><strong>Creator:</strong> {project.owner ? capitalizeFirstLetter(project.owner.name) : "Unknown"}</p>
              <p><strong>Required Amount:</strong> ${project.requiredAmount}</p>
              <p><strong>Current Amount:</strong> ${project.currentAmount}</p>
              <Link to={`/projects/${project._id}`} className="project-link">View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
