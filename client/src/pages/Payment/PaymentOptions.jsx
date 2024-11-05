import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import GooglePayButton from "./GooglePay"; 
import CryptoPaymentButton from "./CryptoPaymentButton"; 
import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import { Payment, Google, MonetizationOn } from "@mui/icons-material"; 
import "./PaymentOptions.css";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY"); // Replace with your actual Stripe public key

const PaymentOptions = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // State to manage selected payment method

  return (
    <Container maxWidth="sm" className="payment-options">
      <Typography variant="h4" component="h2" gutterBottom>
        Select a Payment Method
      </Typography>
      <Grid container spacing={2} className="payment-method-buttons">
        {/* Stripe Payment Method */}
        <Grid item xs={4}>
          <Paper
            elevation={3}
            className={`payment-method-button ${selectedPaymentMethod === "stripe" ? "active" : ""}`}
            onClick={() => setSelectedPaymentMethod("stripe")}
            sx={{ padding: 2, cursor: "pointer", textAlign: "center", transition: "0.3s" }}
          >
            <Payment fontSize="large" sx={{ marginBottom: 1 }} /> {/* Stripe icon */}
            <Typography variant="h6">Pay with Card (Stripe)</Typography>
          </Paper>
        </Grid>

        {/* Google Pay Method */}
        <Grid item xs={4}>
          <Paper
            elevation={3}
            className={`payment-method-button ${selectedPaymentMethod === "googlePay" ? "active" : ""}`}
            onClick={() => setSelectedPaymentMethod("googlePay")}
            sx={{ padding: 2, cursor: "pointer", textAlign: "center", transition: "0.3s" }}
          >
            <Google fontSize="large" sx={{ marginBottom: 1 }} /> {/* Google Pay icon */}
            <Typography variant="h6">Pay with Google Pay (UPI)</Typography>
          </Paper>
        </Grid>

        {/* Crypto Payment Method */}
        <Grid item xs={4}>
          <Paper
            elevation={3}
            className={`payment-method-button ${selectedPaymentMethod === "crypto" ? "active" : ""}`}
            onClick={() => setSelectedPaymentMethod("crypto")}
            sx={{ padding: 2, cursor: "pointer", textAlign: "center", transition: "0.3s" }}
          >
            <MonetizationOn fontSize="large" sx={{ marginBottom: 1 }} /> {/* Crypto icon */}
            <Typography variant="h6">Pay with Crypto</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Show Stripe card form if Stripe is selected */}
      {selectedPaymentMethod === "stripe" && (
        <Elements stripe={stripePromise}>
          <CheckoutForm projectId={id} onSuccess={() => navigate(`/projects/${id}`)} />
        </Elements>
      )}

      {/* Show Google Pay button if Google Pay is selected */}
      {selectedPaymentMethod === "googlePay" && (
        <Box mt={2}>
          <GooglePayButton projectId={id} onSuccess={() => navigate(`/projects/${id}`)} />
        </Box>
      )}

      {/* Show Crypto Payment Button if crypto is selected */}
      {selectedPaymentMethod === "crypto" && (
        <Box mt={2}>
          <CryptoPaymentButton projectId={id} onSuccess={() => navigate(`/projects/${id}`)} />
        </Box>
      )}
    </Container>
  );
};

export default PaymentOptions;
