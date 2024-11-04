import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    showCompleted
      ? project.currentAmount >= project.requiredAmount
      : project.currentAmount < project.requiredAmount
  );

  return (
    <div className="project-list">
      <h1>Our Projects</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${!showCompleted ? "active" : ""}`}
          onClick={() => setShowCompleted(false)}
        >
          Ongoing
        </button>
        <button
          className={`toggle-button ${showCompleted ? "active" : ""}`}
          onClick={() => setShowCompleted(true)}
        >
          Completed
        </button>
      </div>

      <div className="project-list-grid">
        {filteredProjects.map((project) => (
          <div key={project._id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-details">
              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>
              <p><strong>Creator:</strong> {project.owner ? capitalizeFirstLetter(project.owner.username) : "Unknown"}</p>
              <p><strong>Required Amount:</strong> ${project.requiredAmount}</p>
              <p><strong>Current Amount:</strong> ${project.currentAmount}</p>
              <p><strong>Created:</strong> {formatDistanceToNow(parseISO(project.createdAt))} ago</p>
              <Link to={`/projects/${project._id}`} className="project-link">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
