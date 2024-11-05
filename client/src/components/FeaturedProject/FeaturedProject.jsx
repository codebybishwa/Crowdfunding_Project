import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedProject.css';

const FeaturedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        const sortedProjects = response.data
          .sort((a, b) => {
            if (a.currentAmount !== b.currentAmount) {
              return a.currentAmount - b.currentAmount;
            }
            return b.requiredAmount - a.requiredAmount;
          })
          .slice(0, 4);
        
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading featured projects...</div>;
  }

  return (
    <section id="featured-projects" className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="project-cards">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-info">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(project.currentAmount / project.requiredAmount) * 100}%` }}></div>
              </div>
              <a href={`/projects/${project._id}`} className="btn">Support This Project</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
