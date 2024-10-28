// src/pages/LandingPage.jsx

import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import NavbarSection from "../components/NavbarSection/NavbarSection";
import FeaturedProject from "../components/FeaturedProject/FeaturedProject";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PlatformFeatures from "../components/PlatFormFeatures/PlatformFeatures";
import Footer from "../components/Footer/Footer";
const LandingPage = () => {
  return (
    <div>
      <NavbarSection />
      <HeroSection />
      <FeaturedProject />
      <HowItWorks />
      <PlatformFeatures />
      <Footer />
    </div>
  );
};

export default LandingPage;
