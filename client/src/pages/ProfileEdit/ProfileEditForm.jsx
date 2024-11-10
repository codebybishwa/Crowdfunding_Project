import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileEditForm.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';

const ProfileEditForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    PhnNo: '',
    bio: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user data on mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }, // Add token in headers
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      await axios.put(`${BASE_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }, // Add token in headers
      });
      alert("Profile updated successfully!");
      navigate('/profile');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-edit-form-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="PhnNo"
            value={formData.PhnNo}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>
        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
