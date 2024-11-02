// src/components/FundingInstructions/FundingInstructions.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import './FundingInstructions.css';

const FundingInstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const instructions = [
    {
      title: "Step 1: Review Your Contribution",
      content: "Please double-check the amount you wish to contribute and ensure it aligns with your budget and goals. You can always adjust your contribution before finalizing the payment."
    },
    {
      title: "Step 2: Payment Methods",
      content: "You can choose from a variety of payment options including credit/debit cards, PayPal, and bank transfers. Select the method that works best for you."
    },
    {
      title: "Step 3: Secure Your Payment",
      content: "All payments are processed securely through our encrypted payment gateway. Your financial information will remain confidential and safe."
    },
    {
      title: "Step 4: Confirmation",
      content: "After completing your payment, you will receive a confirmation email. This will include a summary of your transaction and the project details."
    },
    {
      title: "Step 5: Fund Withdrawal",
      content: "You can withdraw your funds at any time after the project reaches its funding goal. Proper procedures will be provided in your account dashboard."
    },
    {
      title: "Step 6: Regular Updates",
      content: "You will receive regular updates about the project progress. We will keep you informed through email notifications and updates in your account."
    },
    {
      title: "Step 7: Support",
      content: "If you have any questions or need assistance during the funding process, feel free to contact our support team. We're here to help!"
    },
  ];

  return (
    <Container maxWidth="sm" className="funding-instructions">
      <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Fund Project
        </Typography>
        <Typography variant="body1" paragraph>
          To proceed with funding, please follow the instructions below:
        </Typography>
        {instructions.map((step, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{step.title}</Typography>
            <Typography variant="body2">{step.content}</Typography>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/projects/${id}/payment-options`)}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default FundingInstructions;
