import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios'; // Ensure axios is installed and imported

const mockUsers = [
  { name: "User 1", upiId: "user1@upi", pin: "1234" },
  { name: "User 2", upiId: "user2@upi", pin: "2345" },
  { name: "User 3", upiId: "user3@upi", pin: "3456" },
  { name: "User 4", upiId: "user4@upi", pin: "4567" },
];

const GooglePayButton = ({ projectId, onSuccess }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (window.google) {
      onGooglePayLoaded();
    }
  }, []);

  const onGooglePayLoaded = () => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    });

    const button = paymentsClient.createButton({ onClick: onGooglePayClicked });
    document.getElementById("google-pay-button").appendChild(button);
  };

  const onGooglePayClicked = () => {
    setShowPopup(true);
    setStep(0);
  };

  const handleNextStep = () => {
    switch (step) {
      case 0:
        if (mockUsers.some(user => user.upiId === upiId)) {
          setStep(1);
        } else {
          alert("Invalid UPI ID. Please try again.");
        }
        break;
      case 1:
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
          alert("Please enter a valid amount.");
        } else {
          setStep(2);
        }
        break;
      case 2:
        const user = mockUsers.find(user => user.upiId === upiId);
        if (user && user.pin === pin) {
          processPayment(amount);
        } else {
          alert("Invalid PIN. Please try again.");
        }
        break;
      default:
        break;
    }
  };

  const processPayment = async (amount) => {
    try {
        const amountInNumber = parseFloat(amount);
        console.log("Sending payment amount:", amountInNumber);
        console.log("Project ID:", projectId);
  
        // Retrieve the token (example shown, adjust according to your implementation)
        const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage after login

        const response = await axios.post(`http://localhost:3000/projects/${projectId}`, 
          { amount: amountInNumber },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            }
          }
        );

        console.log("Response from API:", response.data);
  
        setShowPopup(false);
  
        if (response.status === 200) {
            alert("Payment successful!");
            onSuccess(); // Trigger any other success actions, if needed
        } else {
            alert("Payment failed. Please try again.");
        }
    } catch (error) {
        console.error("Payment processing error:", error);
        alert("There was an error processing your payment. Please try again.");
    }
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<PaymentIcon />} 
        onClick={onGooglePayClicked}
        id="google-pay-button"
      >
        <GoogleIcon style={{ marginRight: 8 }} /> Google Pay
      </Button>

      <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Google Pay</DialogTitle>
        <DialogContent>
          {step === 0 && (
            <TextField
              label="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          {step === 1 && (
            <TextField
              label="Enter Amount (in INR)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          {step === 2 && (
            <TextField
              label="Enter PIN"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} color="primary">
              Back
            </Button>
          )}
          <Button onClick={handleNextStep} color="primary">
            {step === 2 ? "Confirm" : "Next"}
          </Button>
          <Button onClick={() => setShowPopup(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GooglePayButton;
