// src/App.js
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import NavbarSection from "./components/NavbarSection/NavbarSection";
import ProjectList from "./pages/ProjectList/ProjectList";
import Footer from "./components/Footer/Footer";
import ProjectDetail from "./pages/ProjectDetails/ProjectDetails";
import UserPage from "./pages/UserSection/UserPage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProjectDetailEdit from "./pages/ProjectDetailsEdit/ProjectDetailsEdit";
import CreateProjectForm from "./pages/CreateProject/CreateProjectForm";
import ProfileEditForm from "./pages/ProfileEdit/ProfileEditForm";
import FundingInstructions from "./pages/Funding/FundingInstructions.jsx";
import PaymentOptions from "./pages/Payment/PaymentOptions";
import '@mui/material/styles';
import PaymentResult from "./pages/Payment/PaymentResult.jsx";

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
          <Route path="/projects/:id/edit" element={<ProjectDetailEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/createProject" element={<CreateProjectForm />} />
          <Route path="/profile/edit" element={<ProfileEditForm />} />
          <Route path="/projects/:id/fund" element={<FundingInstructions />} />
          <Route path="/projects/:id/payment-options" element={<PaymentOptions />} />
          <Route path="/payment-result" element={<PaymentResult isSuccess={true} message="Payment Successful!" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;













// // src/App.js
// import "./App.css";
// import { Route, Routes } from 'react-router-dom';
// import LandingPage from "./pages/LandingPage";
// import NavbarSection from "./components/NavbarSection/NavbarSection";
// import ProjectList from "./pages/ProjectList/ProjectList";
// import Footer from "./components/Footer/Footer";
// import ProjectDetail from "./pages/ProjectDetails/ProjectDetails";
// import UserPage from "./pages/UserSection/UserPage";
// import Login from "./pages/Login/Login";
// import SignUp from "./pages/SignUp/SignUp";
// import ProjectDetailEdit from "./pages/ProjectDetailsEdit/ProjectDetailsEdit";

// function App() {
//   return (
//     <>
//       <NavbarSection /> {/* Navbar will be visible on all pages */}
//       <div>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/projects" element={<ProjectList />} />
//           <Route path="/projects/:id" element={<ProjectDetail />} />
//           <Route path="/profile" element={<UserPage />} />
//           <Route path="/projects/:id/edit" element={<ProjectDetailEdit />} />
//           <Route path="/login" element={<Login />}/>
//           <Route path="/register" element={<SignUp />}/>
//           {/* 
//           <Route path="/contact" element={<Contact />} />
          
//           <Route path="/projects/:id" element={<ProjectDetail />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/create" element={<CreateProject />} /> */}
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;
