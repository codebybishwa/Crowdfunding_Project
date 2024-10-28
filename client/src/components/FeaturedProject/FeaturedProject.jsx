import React from 'react';
import "./FeaturedProject.css"

const FeaturedProject
 = () => {
    const projects = [
        {
            id: 1,
            title: "Project Title 1",
            description: "Short description of Project 1.",
            image: "project1.jpg",
            progress: 70
        },
        {
            id: 2,
            title: "Project Title 2",
            description: "Short description of Project 2.",
            image: "project2.jpg",
            progress: 40
        },
        {
            id: 3,
            title: "Project Title 3",
            description: "Short description of Project 3.",
            image: "project3.jpg",
            progress: 90
        }
    ];

    return (
        <section id="featured-projects" className="featured-projects">
            <h2>Featured Projects</h2>
            <div className="project-cards">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <img src={project.image} alt={project.title} />
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <a href="#" className="btn">Support This Project</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProject
;
