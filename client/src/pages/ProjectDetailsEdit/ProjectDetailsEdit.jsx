import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetailsEdit.css';

const ProjectDetailEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    image: '',
    requiredAmount: 0, // Initialize as a number
    documentation: [],
  });

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust based on your storage choice
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token again

      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setProject(response.data);
        setProjectDetails({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
          requiredAmount: response.data.requiredAmount,
          documentation: response.data.documentation,
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'requiredAmount' ? Number(value) : value; // Convert to number if it's requiredAmount

    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token again

    try {
      await axios.put(`http://localhost:3000/projects/${id}`, projectDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      console.log("Navigating to:", `/projects/${id}`);
      navigate(`/projects/${id}`); // Redirect back to project details
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="project-detail-edit">
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={projectDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projectDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={projectDetails.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Required Amount:</label>
          <input
            type="number"
            name="requiredAmount"
            value={projectDetails.requiredAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Documentation (comma separated):</label>
          <input
            type="text"
            name="documentation"
            value={projectDetails.documentation.join(', ')}
            onChange={(e) => handleChange({
              target: {
                name: 'documentation',
                value: e.target.value.split(',').map(doc => doc.trim()),
              },
            })}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProjectDetailEdit;
