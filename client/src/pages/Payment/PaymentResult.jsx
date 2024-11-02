// src/pages/PaymentResult/PaymentResult.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const PaymentResult = ({ isSuccess, message }) => {
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/projects'); // Redirect to projects after 8 seconds
    }, 8000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: isSuccess ? '#dff0d8' : '#f2dede',
      color: isSuccess ? '#3c763d' : '#a94442',
      textAlign: 'center',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    }}>
      <Typography variant="h5">{message}</Typography>
      <Typography variant="h6">Redirecting in {countdown} seconds...</Typography>
      <Button onClick={() => navigate('/projects')} color="primary" style={{ marginTop: '10px' }}>
        Go to Projects Now
      </Button>
    </div>
  );
};

export default PaymentResult;
