import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetailsEdit.css';
import BASE_URL from '../../config';

const ProjectDetailEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    image: '',
    requiredAmount: 0,
    documentation: [],
  });

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    const newValue = name === 'requiredAmount' ? Number(value) : value;

    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`${BASE_URL}/projects/${id}`, projectDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Navigating to:", `/projects/${id}`);
      navigate(`/projects/${id}`);
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
    <div className="create-project-form-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit} className="create-project-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={projectDetails.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={projectDetails.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={projectDetails.image}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Required Amount:
          <input
            type="number"
            name="requiredAmount"
            value={projectDetails.requiredAmount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Documentation (comma separated):
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
        </label>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ProjectDetailEdit;
