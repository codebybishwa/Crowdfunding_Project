// SignUp.jsx
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './SignUp.css';


const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">
          Sign Up
        </h1>

        <form>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="username"
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

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
            />
          </div>


          <Link to="/login" className="already-account-link">
            Already have an account?
          </Link>

          <button className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
