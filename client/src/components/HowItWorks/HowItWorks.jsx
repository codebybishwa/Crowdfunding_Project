import React from 'react';
import "./HowItWorks.css"

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
                <div className="step">
                    <h3>1. Explore Projects</h3>
                    <p>Discover innovative ideas and inspiring causes.</p>
                </div>
                <div className="step">
                    <h3>2. Choose a Project</h3>
                    <p>Pick a project to support, with flexible funding options.</p>
                </div>
                <div className="step">
                    <h3>3. Make an Impact</h3>
                    <p>Track progress and stay connected with the project's journey.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
