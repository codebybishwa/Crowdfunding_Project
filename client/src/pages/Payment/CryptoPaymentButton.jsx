import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import axios from "axios";
import { default as jwt_decode } from "jwt-decode";
import abi from "../../CrowdFundingJson/CrowdFunding.json";
import BASE_URL from "../../config";

const CryptoPaymentButton = ({ projectId, onSuccess }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("0.00"); // State for USD amount
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwtToken(token);
    } else {
      console.error("JWT Token not found");
    }
  }, []);

  const handlePayment = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required to make a payment.");
      return;
    }

    setLoading(true);
    let usdAmountLogged;

    try {
      // Decode JWT token to get contributor ID
      const decoded = jwt_decode(jwtToken);
      const contributorId = decoded.sub;
      console.log(contributorId);
      const ethAmount = ethers.parseEther(amount);

      // Set up provider and signer for MetaMask interaction
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Connect to the contract
      const contract = new ethers.Contract(
        "0x667Db83d80203CFEF6782e5Ff3941d0AcA5A7FD1",
        abi.abi,
        signer
      );

      // Fetch the latest ETH-USD conversion rate from the contract
      const ethUsdRate = await contract.getLatestETHUSDPrice();
      const usdEquivalent = (parseFloat(amount) * ethers.formatUnits(ethUsdRate, 18)).toFixed(6);
      console.log(`USD Equivalent: $${usdEquivalent}`);

      // Contribute to the contract
      const tx = await contract.contribute(projectId, contributorId, { value: ethAmount });
      const receipt = await tx.wait();

      // Process the transaction receipt for event logs
      if (receipt.logs && receipt.logs.length > 0) {
        const iface = new ethers.Interface(abi.abi);
        receipt.logs.forEach((log) => {
          try {
            const parsedLog = iface.parseLog(log);
            if (parsedLog.name === "ContributionReceived") {
              usdAmountLogged = ethers.formatUnits(parsedLog.args[3], 18);
              console.log(`ETH Amount (logged): ${ethers.formatEther(parsedLog.args[2])}`);
              console.log(`USD Amount (logged): ${usdAmountLogged}`);
            }
          } catch (err) {
            console.error("Failed to parse log:", err);
          }
        });
      }

      // Send the transaction information to the backend
      const response = await axios.put(
        `${BASE_URL}/projects/${projectId}/contribute`,
        {
          amount: usdAmountLogged || usdEquivalent,
          userId : contributorId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Payment successful!");
        onSuccess();
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setLoading(false);
      setShowPopup(false);
    }
  };

  // Update USD amount whenever ETH amount changes
  const handleAmountChange = async (e) => {
    const ethInput = e.target.value;
    setAmount(ethInput);

    if (ethInput) {
      const ethAmount = ethers.parseEther(ethInput);
      // Fetch the latest ETH-USD conversion rate
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        "0x667Db83d80203CFEF6782e5Ff3941d0AcA5A7FD1",
        abi.abi,
        provider
      );

      const ethUsdRate = await contract.getLatestETHUSDPrice();
      const usdEquivalent = (parseFloat(ethInput) * ethers.formatUnits(ethUsdRate, 18)).toFixed(6);
      setUsdAmount(usdEquivalent);
    } else {
      setUsdAmount("0.00");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowPopup(true)}
        aria-label="Open crypto payment dialog"
      >
        Pay with Crypto
      </Button>

      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="crypto-payment-dialog"
      >
        <DialogTitle id="crypto-payment-dialog">Crypto Payment</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Equivalent Amount: ${usdAmount}</Typography>
          <TextField
            label="Enter Amount (in ETH)"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
            inputProps={{ "aria-label": "Amount in ETH" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePayment}
            color="primary"
            disabled={loading}
            aria-label="Confirm crypto payment"
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
          <Button
            onClick={() => setShowPopup(false)}
            color="secondary"
            aria-label="Cancel crypto payment"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CryptoPaymentButton;
