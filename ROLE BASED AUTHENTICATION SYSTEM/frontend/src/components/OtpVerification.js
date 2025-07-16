import { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function OtpVerification({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");
    if (!otp || !email) {
      setError("Email or OTP missing.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup-verify", {
        email,
        otp,
      });

      const { token, user } = res.data;

      // Pass user and token to parent for login & redirect
      onVerified(user, token);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h6" gutterBottom>
        Verify Your Email
      </Typography>

      {error && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        style={{ marginBottom: "1rem" }}
        InputProps={{ style: { color: "white" } }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
}
