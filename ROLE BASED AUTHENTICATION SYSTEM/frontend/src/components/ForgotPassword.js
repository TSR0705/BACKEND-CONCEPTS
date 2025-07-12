import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      setSuccess(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setSuccess("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

      // Clear fields
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "400px", padding: "16px" }}
      >
        <Card
          style={{
            backgroundColor: "#1E1E1E",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              style={{
                color: "#4db8ff",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Forgot Password
            </Typography>

            {error && (
              <Alert severity="error" style={{ marginBottom: "12px" }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" style={{ marginBottom: "12px" }}>
                {success}
              </Alert>
            )}

            {step === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "#2a3b4f",
                    borderRadius: "5px",
                    marginBottom: "16px",
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
                <Button variant="contained" fullWidth onClick={handleEmailSubmit}>
                  Send OTP
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    backgroundColor: "#2a3b4f",
                    borderRadius: "5px",
                    marginBottom: "16px",
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    backgroundColor: "#2a3b4f",
                    borderRadius: "5px",
                    marginBottom: "16px",
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  style={{
                    backgroundColor: "#2a3b4f",
                    borderRadius: "5px",
                    marginBottom: "16px",
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
                <Button variant="contained" fullWidth onClick={handleResetPassword}>
                  Reset Password
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
