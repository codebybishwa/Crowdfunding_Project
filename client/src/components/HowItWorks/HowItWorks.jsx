import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheckCircle, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import "./HowItWorks.css";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
                <div className="step">
                    <FontAwesomeIcon icon={faEye} size="2x" aria-label="Explore Projects" />
                    <h3>1. Explore Projects</h3>
                    <p>Discover innovative ideas and inspiring causes.</p>
                </div>
                <div className="step">
                    <FontAwesomeIcon icon={faCheckCircle} size="2x" aria-label="Choose a Project" />
                    <h3>2. Choose a Project</h3>
                    <p>Pick a project to support, with flexible funding options.</p>
                </div>
                <div className="step">
                    <FontAwesomeIcon icon={faHandsHelping} size="2x" aria-label="Make an Impact" />
                    <h3>3. Make an Impact</h3>
                    <p>Track progress and stay connected with the project's journey.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
