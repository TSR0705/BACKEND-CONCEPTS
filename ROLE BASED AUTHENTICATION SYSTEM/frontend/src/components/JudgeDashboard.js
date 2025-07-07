import { useState } from "react";
import { Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Gavel, FileText, Users, Clock, Search, Shield, CheckCircle, Bell, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function JudgeDashboard() {
  const [cases] = useState([
    { id: 1, title: "Case 101: Smith vs. Jones", status: "Ongoing", time: "10:00 AM" },
    { id: 2, title: "Case 102: State vs. Doe", status: "Pending", time: "11:30 AM" },
    { id: 3, title: "Case 103: Brown vs. Green", status: "Completed", time: "1:00 PM" },
  ]);

  const tools = [
    { icon: FileText, title: "Legal Documents", path: "/documents" },
    { icon: Users, title: "Case Participants", path: "/participants" },
    { icon: Clock, title: "Schedule Management", path: "/schedule" },
    { icon: Search, title: "AI Case Law Search", path: "/search" },
    { icon: Shield, title: "Fact-Checking & AI Cross-Questions", path: "/fact-checking" },
    { icon: CheckCircle, title: "Predictive Case Outcome", path: "/prediction" },
    { icon: Bell, title: "Notifications & Case Tracking", path: "/notifications" },
    { icon: BarChart2, title: "User & Case Analytics", path: "/analytics" },
  ];

  return (
    <div style={{ backgroundColor: "#141e30", minHeight: "100vh", color: "white", padding: "32px" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#4db8ff", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <Gavel size={40} /> Judge Dashboard
        </h1>
        <p style={{ color: "#b0bec5", marginTop: "8px" }}>Manage court proceedings efficiently with AI-powered tools.</p>
      </motion.div>

      {/* Case Management */}
      <div style={{ marginTop: "40px", backgroundColor: "#1e2a38", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Upcoming Cases</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Case Title</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Time</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id} style={{ backgroundColor: "#22303f" }}>
                <TableCell style={{ color: "#b0bec5" }}>{caseItem.title}</TableCell>
                <TableCell style={{ color: caseItem.status === "Ongoing" ? "#ffcc00" : caseItem.status === "Pending" ? "#ff4444" : "#00c851" }}>{caseItem.status}</TableCell>
                <TableCell style={{ color: "#b0bec5" }}>{caseItem.time}</TableCell>
                <TableCell>
                  <Link to={`/case-details/${caseItem.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" style={{ backgroundColor: "#007bff", color: "white" }}>View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tools & Resources */}
      <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
        {tools.map((tool, index) => (
          <Link to={tool.path} key={index} style={{ textDecoration: "none" }}>
            <Card style={{ padding: "16px", cursor: "pointer", backgroundColor: "#1e2a38", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
              <CardContent>
                <tool.icon size={40} style={{ color: "#4db8ff" }} />
                <p style={{ marginTop: "8px", fontWeight: "bold", color: "#b0bec5" }}>{tool.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
