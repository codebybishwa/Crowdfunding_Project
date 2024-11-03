import { useState } from "react"; // Import useState to manage component state
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import axios from "axios"; // Import axios for making HTTP requests
import './Login.css'; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); // State for form data
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update specific form field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:3000/login", formData);
      // Save the received token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the desired page after successful login
      console.log(response.data.token);
      navigate("/");
    } catch (error) {
      // Handle error responses from the backend
      setError(error.response?.data?.message || "Login failed");
      console.log("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter email"
              className="form-input"
              value={formData.email} // Bind input value to state
              onChange={handleChange} // Update state on change
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="form-input"
              value={formData.password} // Bind input value to state
              onChange={handleChange} // Update state on change
            />
          </div>

          {/* Use Link to navigate to the Sign Up page */}
          <Link to="/register" className="forgot-password">
            Don’t have an account?
          </Link>

          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          {success && <div className="success-message">Login successful!</div>} {/* Display success message */}

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
