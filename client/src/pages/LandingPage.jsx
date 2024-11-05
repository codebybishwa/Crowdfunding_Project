// src/pages/LandingPage.jsx

import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedProject from "../components/FeaturedProject/FeaturedProject";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PlatformFeatures from "../components/PlatFormFeatures/PlatformFeatures";
import Footer from "../components/Footer/Footer";
import AboutUs from "../components/AboutUs/AboutUs";
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <FeaturedProject />
      <HowItWorks />
      <PlatformFeatures />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
