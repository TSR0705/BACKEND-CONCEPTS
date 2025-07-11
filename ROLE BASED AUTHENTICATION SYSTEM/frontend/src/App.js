import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import JudgeDashboard from "./components/JudgeDashboard";
import LawyerDashboard from "./components/LawyerDashboard";
import StudentDashboard from "./components/StudentDashboard";
import LitigantDashboard from "./components/LitigantDashboard";
import { AuthProvider } from "./context/AuthContext"; // ✅ NEW
import ProtectedRoute from "./components/ProtectedRoutes"; // ✅ NEW

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />

          {/* 🔐 Protected Routes */}
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
