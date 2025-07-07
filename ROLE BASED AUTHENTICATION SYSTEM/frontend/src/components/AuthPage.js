import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !fullName)) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const endpoint = isLogin ? "login" : "signup";

      const payload = isLogin
        ? { email, password, role }
        : { fullName, email, password, role };

      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

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
          setError("Unknown role received from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
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
              style={{ color: "#4db8ff", fontWeight: "bold", marginBottom: "12px" }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Typography>

            {error && (
              <Alert severity="error" style={{ marginBottom: "12px" }}>
                {error}
              </Alert>
            )}

            <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ backgroundColor: "#2a3b4f", borderRadius: "5px" }}
                  InputProps={{ style: { color: "white" } }}
                />
              )}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "#2a3b4f", borderRadius: "5px" }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: "#2a3b4f", borderRadius: "5px" }}
                InputProps={{ style: { color: "white" } }}
              />
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ backgroundColor: "#2a3b4f", borderRadius: "5px" }}
                  InputProps={{ style: { color: "white" } }}
                />
              )}
              <FormControl fullWidth style={{ backgroundColor: "#2a3b4f", borderRadius: "5px" }}>
                <InputLabel style={{ color: "white" }}>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  variant="outlined"
                  style={{ color: "white" }}
                >
                  <MenuItem value="Judge">Judge</MenuItem>
                  <MenuItem value="Lawyer">Lawyer</MenuItem>
                  <MenuItem value="Law Student">Law Student</MenuItem>
                  <MenuItem value="Litigants">Litigants</MenuItem>
                </Select>
              </FormControl>

              {isLogin && (
                <Typography
                  align="right"
                  style={{
                    color: "#4db8ff",
                    fontSize: "14px",
                    marginTop: "8px",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  fontWeight: "bold",
                  padding: "8px",
                  borderRadius: "5px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                onClick={(e) => {
                  e.preventDefault();
                  handleAuth();
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>

            <Divider
              style={{
                backgroundColor: "#424242",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              or continue with
            </Divider>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <IconButton
                style={{ color: "#4db8ff", transition: "transform 0.2s" }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                <FaGoogle size={22} />
              </IconButton>
              <IconButton
                style={{ color: "#E0E0E0", transition: "transform 0.2s" }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                <FaGithub size={22} />
              </IconButton>
            </div>

            <Typography
              align="center"
              style={{ color: "#B0BEC5", marginTop: "16px", cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
