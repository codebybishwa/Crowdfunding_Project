// src/components/AboutUs/AboutUs.jsx

import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <section className="about-us">
            <h2 className="about-heading">About Us</h2> {/* Centered heading */}
            <div className="about-us-content">
                <div className="about-text">
                    <p>
                        We believe in the power of community and collective action. Our crowdfunding platform is dedicated to empowering individuals,
                         entrepreneurs, and organizations to bring their innovative ideas to life. Whether you’re launching a groundbreaking product, funding a creative project,
                          or supporting a charitable cause, we provide the tools and resources to connect you with passionate supporters who share your vision. Our user-friendly platform facilitates
                           seamless campaigns, fostering engagement and collaboration within a vibrant community. Join us in transforming dreams into reality—together, we can make a difference!
                    </p>
                </div>
                <div className="about-video">
                    <iframe
                        title="About Our Project Video"
                        src="https://www.youtube.com/embed/voF1plqqZJA"
                        frameBorder="0"
                        allowFullScreen
                        className="video-frame"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
