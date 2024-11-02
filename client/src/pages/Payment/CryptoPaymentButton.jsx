// CryptoPaymentButton.js
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios"; 

const CryptoPaymentButton = ({ projectId, onSuccess }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 0) {
      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount.");
      } else {
        setStep(1);
      }
    } else if (step === 1) {
      // Validate crypto address (simple validation)
      if (!cryptoAddress) {
        alert("Please enter a valid cryptocurrency address.");
      } else {
        processPayment(amount, cryptoAddress);
      }
    }
  };

  const processPayment = async (amount, cryptoAddress) => {
    try {
      const amountInNumber = parseFloat(amount);
      console.log("Sending crypto payment amount:", amountInNumber);
      console.log("Project ID:", projectId);
      console.log("Crypto Address:", cryptoAddress);

      const response = await axios.post(`http://localhost:3000/projects/${projectId}`, {
        amount: amountInNumber,
        cryptoAddress: cryptoAddress
      });

      console.log("Response from API:", response.data);

      if (response.status === 200) {
        alert("Payment successful!");
        onSuccess(); 
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setShowPopup(false); // Close the popup on completion
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowPopup(true)}
      >
        Pay with Crypto
      </Button>

      <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Crypto Payment</DialogTitle>
        <DialogContent>
          {step === 0 && (
            <TextField
              label="Enter Amount (in crypto)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          {step === 1 && (
            <TextField
              label="Enter Crypto Address"
              value={cryptoAddress}
              onChange={(e) => setCryptoAddress(e.target.value)}
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
            {step === 1 ? "Confirm" : "Next"}
          </Button>
          <Button onClick={() => setShowPopup(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CryptoPaymentButton;
