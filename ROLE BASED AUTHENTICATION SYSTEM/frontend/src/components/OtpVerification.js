// components/OtpVerification.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!otp || !email) {
      setError("Email or OTP missing.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup-verify", {
        email,
        otp,
      });

      const { token, user } = res.data;

      login(token, user); // Use context to log in

      // Navigate based on role
      switch (user.role) {
        case "Judge":
          navigate("/judge-dashboard");
          break;
        case "Lawyer":
          navigate("/lawyer-dashboard");
          break;
        case "Law Student":
          navigate("/student-dashboard");
          break;
        case "Litigants":
          navigate("/litigant-dashboard");
          break;
        default:
          setError("Unknown user role.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h6" gutterBottom>
        Verify Your Email
      </Typography>

      {error && <Alert severity="error" style={{ marginBottom: "1rem" }}>{error}</Alert>}

      <TextField
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleVerify}
      >
        Verify OTP
      </Button>
    </div>
  );
}
