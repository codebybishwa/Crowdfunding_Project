import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
      </div>
    </>
  );
}

export default App;
