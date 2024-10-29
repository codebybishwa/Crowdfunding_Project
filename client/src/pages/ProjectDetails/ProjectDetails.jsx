import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/projects/${id}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/projects/${id}`
        );
        console.log("Delete response:", response.data); // Log the response
        navigate("/projects"); // Redirect to the projects list
      } catch (error) {
        console.error("Error deleting project:", error);
        // Optionally, show an alert or a message to the user
        alert("Failed to delete the project.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  const progress = (project.currentAmount / project.requiredAmount) * 100;

  return (
    <div className="project-detail">
      <h1>{project.name}</h1>
      <img
        src={project.image}
        alt={project.name}
        className="project-detail-image"
      />
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
            {project.funders &&
              project.funders.map((funder) => (
                <li key={funder._id}>{funder.name}</li>
              ))}
          </ul>
        </div>

        <div className="documentation">
          <h3>Official Documentation</h3>
          <ul>
            {project.documentation.map((doc, index) => (
              <li key={index}>
                <a
                  href={`path/to/${doc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-actions">
          <button
            className="edit-button"
            onClick={() => navigate(`/projects/${id}/edit`)}
          >
            Edit
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
