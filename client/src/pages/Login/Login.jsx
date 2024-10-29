
import './Login.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <form>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-input"
            />
          </div>

          {/* Use Link to navigate to the Sign Up page */}
          <Link to="/register" className="forgot-password">
            Don’t have an account?
          </Link>

          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
