import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import JudgeDashboard from "./components/JudgeDashboard";
import LawyerDashboard from "./components/LawyerDashboard";
import StudentDashboard from "./components/StudentDashboard";
import LitigantDashboard from "./components/LitigantDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/judge-dashboard" element={<JudgeDashboard />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/litigant-dashboard" element={<LitigantDashboard />} />
      </Routes>
    </Router>
  );
}
