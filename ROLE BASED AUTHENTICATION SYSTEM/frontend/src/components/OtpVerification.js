// components/OtpVerification.js
import { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function OtpVerification({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup-verify", {
        email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      onVerified(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Enter the OTP sent to your email
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        label="6-digit OTP"
        fullWidth
        style={{ margin: "1rem 0" }}
      />
      <Button variant="contained" color="primary" onClick={handleVerify}>
        Verify OTP
      </Button>
    </div>
  );
}
