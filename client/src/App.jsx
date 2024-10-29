// src/App.js
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import NavbarSection from "./components/NavbarSection/NavbarSection";
import ProjectList from "./pages/ProjectList/ProjectList";
import Footer from "./components/Footer/Footer";
import ProjectDetail from "./pages/ProjectDetails/ProjectDetails";
import UserPage from "./pages/UserSection/UserPage";

function App() {
  return (
    <>
      <NavbarSection /> {/* Navbar will be visible on all pages */}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/profile/projects/:id" element={<ProjectDetail />} />
          {/* 
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateProject />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
