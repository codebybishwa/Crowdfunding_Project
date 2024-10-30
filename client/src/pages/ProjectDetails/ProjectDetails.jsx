// src/components/ProjectDetail/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./ProjectDetails.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get("http://localhost:3000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data._id);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };
      fetchCurrentUser();
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:3000/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/projects");
      } catch (error) {
        console.error("Error deleting project:", error);
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
  const isCreator = userId === project.owner._id;
  const createdAtFormatted = formatDistanceToNow(new Date(project.createdAt), {
    addSuffix: true,
  });

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
        <p className="created-at">Created {createdAtFormatted}</p> {/* Display creation time */}

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
                <li key={funder._id}>{funder.username}</li>
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

        {isCreator && (
          <div className="project-actions">
            <button
              className="editbutton"
              onClick={() => navigate(`/projects/${id}/edit`)}
            >
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
