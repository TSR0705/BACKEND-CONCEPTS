import { useState } from "react";
import { Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Book, GraduationCap, FileText, Users, ShieldCheck, Trophy, BookOpen, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [tasks] = useState([
    { id: 1, title: "Case Study: Smith vs. Jones", status: "Pending" },
    { id: 2, title: "Mock Trial Participation", status: "Completed" },
    { id: 3, title: "Legal Quiz Challenge", status: "Ongoing" },
  ]);

  const [leaderboard] = useState([
    { id: 1, name: "Alice Johnson", points: 150, rank: "Gold" },
    { id: 2, name: "John Doe", points: 120, rank: "Silver" },
    { id: 3, name: "Emma Smith", points: 100, rank: "Bronze" },
  ]);

  const [contributions] = useState([
    { id: 1, title: "Legal Research on AI Ethics", date: "March 2, 2025" },
    { id: 2, title: "Mock Trial: Landmark Case Study", date: "March 1, 2025" },
  ]);

  const tools = [
    { icon: <FileText size={40} style={{ color: "#4db8ff" }} />, title: "AI Legal Research", path: "/search" },
    { icon: <Users size={40} style={{ color: "#4db8ff" }} />, title: "Mock Courtroom", path: "/mock-courtroom" },
    { icon: <Trophy size={40} style={{ color: "#4db8ff" }} />, title: "Quizzes & Leaderboard", external: "https://docs.google.com/forms/d/e/1FAIpQLScD-yaOsehN3R0R9L9fYRWZRmiobEskc_tXnluT-9WLL04ruQ/viewform?usp=header" },
    { icon: <ShieldCheck size={40} style={{ color: "#4db8ff" }} />, title: "Case Analysis AI", path: "/analysis" },
    { icon: <Book size={40} style={{ color: "#4db8ff" }} />, title: "Legal Knowledge Graph", path: "/knowledge-graph" },
    { icon: <BookOpen size={40} style={{ color: "#4db8ff" }} />, title: "Legal Research", path: "/legal-research" },
    { icon: <Award size={40} style={{ color: "#4db8ff" }} />, title: "Certifications", path: "/certifications" },
  ];

  return (
    <div style={{ backgroundColor: "#141e30", minHeight: "100vh", color: "white", padding: "32px" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#4db8ff", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <GraduationCap size={40} /> Law Students Dashboard
        </h1>
        <p style={{ color: "#b0bec5", marginTop: "8px" }}>Enhance your legal knowledge with AI-powered tools and track your progress.</p>
      </motion.div>

      {/* Task Management */}
      <div style={{ marginTop: "40px", backgroundColor: "#1e2a38", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Your Tasks</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Task</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} style={{ backgroundColor: "#22303f" }}>
                <TableCell style={{ color: "#b0bec5" }}>{task.title}</TableCell>
                <TableCell style={{ color: task.status === "Ongoing" ? "#ffcc00" : task.status === "Pending" ? "#ff4444" : "#00c851" }}>
                  {task.status}
                </TableCell>
                <TableCell>
                  <Button variant="contained" style={{ backgroundColor: "#007bff", color: "white" }}>View Task</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Leaderboard and Contributions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
        
        {/* Leaderboard */}
        <div style={{ padding: "1.5rem", borderRadius: "10px", backgroundColor: "#1e2a38", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Leaderboard</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Rank</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((student) => (
                <TableRow key={student.id} style={{ backgroundColor: "#22303f" }}>
                  <TableCell>{student.rank === "Gold" ? "🥇" : student.rank === "Silver" ? "🥈" : "🥉"}</TableCell>
                  <TableCell style={{ color: "#b0bec5" }}>{student.name}</TableCell>
                  <TableCell style={{ color: "#ffcc00" }}>{student.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Contributions */}
        <div style={{ padding: "1.5rem", borderRadius: "10px", backgroundColor: "#1e2a38", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Your Contributions</h2>
          {contributions.map((contribution) => (
            <Card key={contribution.id} style={{ backgroundColor: "#3b5268", marginBottom: "1rem", padding: "1rem" }}>
              <CardContent style={{ display: "flex", justifyContent: "space-between", color: "#ccc" }}>
                <p>{contribution.title}</p>
                <p style={{ color: "#999" }}>{contribution.date}</p>
              </CardContent>
            </Card>
          ))}
          <Button variant="contained" style={{ backgroundColor: "#007bff", color: "white", marginTop: "1rem" }}>Add Contribution</Button>
        </div>
      </div>

      {/* Tools & Resources */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
        {tools.map((tool, index) => (
          <Card key={index} style={{ padding: "1.5rem", borderRadius: "10px", backgroundColor: "#1e2a38", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", cursor: "pointer", transition: "transform 0.2s" }}>
            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {tool.icon}
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "#ccc" }}>
                {tool.external ? (
                  <a href={tool.external} target="_blank" rel="noopener noreferrer" style={{ color: "#b0bec5" }}>{tool.title}</a>
                ) : (
                  <Link to={tool.path} style={{ color: "#b0bec5" }}>{tool.title}</Link>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
