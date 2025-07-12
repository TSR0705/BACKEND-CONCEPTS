import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import JudgeDashboard from "./components/JudgeDashboard";
import LawyerDashboard from "./components/LawyerDashboard";
import StudentDashboard from "./components/StudentDashboard";
import LitigantDashboard from "./components/LitigantDashboard";
import ForgotPassword from "./components/ForgotPassword"; // ✅ NEW
 
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
           
          {/* Protected Role-Based Dashboards */}
          <Route
            path="/judge-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Judge"]}>
                <JudgeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lawyer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Lawyer"]}>
                <LawyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Law Student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/litigant-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Litigants"]}>
                <LitigantDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
