import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import BASE_URL from "../../config";
const CheckoutForm = ({ projectId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    alert("Stripe has not loaded. Please refresh the page and try again.");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const { data } = await axios.post(`${BASE_URL}/create-payment-intent`, {
        projectId,
        amount: 1000, 
      });
      
      const clientSecret = data.clientSecret;  // Directly access clientSecret
      
      console.log("Client Secret:", clientSecret); // Verify it's a string
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      

    if (error) {
        console.error("Error confirming payment:", error); // Log the error
        alert("Payment failed. Please try again.");
        return; // Exit if there's an error
      }

    if (!error) {
      await axios.post(`${BASE_URL}/projects/${projectId}/fund`, {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
      });
      onSuccess();
    } else {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
