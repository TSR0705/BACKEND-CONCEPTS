
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Scale, FileText, Clock, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function LitigantDashboard() {
  const [cases] = useState([
    {
      id: 1,
      title: "Smith vs. Jones",
      status: "In Progress",
      hearing: "March 10, 2025",
      lawyer: "John Doe, Esq.",
      documents: [
        { id: 1, name: "Complaint.pdf", uploaded: "2025-03-01", url: "/files/complaint.pdf" },
        { id: 2, name: "Evidence_001.pdf", uploaded: "2025-03-02", url: "/files/evidence_001.pdf" },
      ],
    },
    {
      id: 2,
      title: "State vs. Doe",
      status: "Awaiting Hearing",
      hearing: "March 15, 2025",
      lawyer: "Jane Black, Esq.",
      documents: [{ id: 3, name: "Indictment.pdf", uploaded: "2025-03-03", url: "/files/indictment.pdf" }],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [message, setMessage] = useState("");
  const [caseMessages, setCaseMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    let timer;
    if (openDialog && selectedCase && caseMessages[selectedCase.id]?.length) {
      const lastMessage = caseMessages[selectedCase.id].slice(-1)[0];
      if (lastMessage.sender === "Litigant") {
        timer = setTimeout(() => {
          setCaseMessages((prev) => ({
            ...prev,
            [selectedCase.id]: [
              ...prev[selectedCase.id],
              {
                sender: "Lawyer",
                text: `Thank you, I'll review your concern regarding ${selectedCase.title}.`,
                timestamp: new Date().toLocaleString(),
              },
            ],
          }));
        }, 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [openDialog, selectedCase, caseMessages]);

  const handleOpenDialog = (caseItem) => {
    setSelectedCase(caseItem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      setSnackbar({ open: true, message: "Message cannot be empty!", severity: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setCaseMessages((prev) => ({
        ...prev,
        [selectedCase.id]: [
          ...(prev[selectedCase.id] || []),
          { sender: "Litigant", text: message, timestamp: new Date().toLocaleString() },
        ],
      }));
      setMessage("");
      setLoading(false);
      setSnackbar({ open: true, message: "Message sent to lawyer!", severity: "success" });
    }, 500);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const tools = [
    { icon: FileText, title: "Legal Documents", link: "/assistant" },
    { icon: MessageCircle, title: "Consult Lawyer", link: "/consult" },
    { icon: Clock, title: "Hearing Schedule", link: "/schedule" },
  ];

  return (
    <div style={{ backgroundColor: "#141e30", minHeight: "100vh", color: "white", padding: "32px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#4db8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Scale size={40} /> Litigant Dashboard
        </h1>
        <p style={{ color: "#b0bec5", marginTop: "8px" }}>Track your legal cases and stay updated.</p>
      </motion.div>

      {/* Case Tracking */}
      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#1e2a38",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Your Cases</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Case Title</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Next Hearing</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Lawyer</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((c) => (
              <TableRow key={c.id} style={{ backgroundColor: "#22303f" }}>
                <TableCell style={{ color: "#b0bec5" }}>{c.title}</TableCell>
                <TableCell style={{ color: c.status === "In Progress" ? "#ffcc00" : "#ff4444" }}>{c.status}</TableCell>
                <TableCell style={{ color: "#b0bec5" }}>{c.hearing}</TableCell>
                <TableCell style={{ color: "#b0bec5" }}>{c.lawyer}</TableCell>
                <TableCell>
                  <Link to={`/case-details/${c.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" style={{ backgroundColor: "#007bff", color: "white", marginRight: "8px" }}>
                      View Details
                    </Button>
                  </Link>
                  <Button variant="contained" style={{ backgroundColor: "#4db8ff", color: "white" }} onClick={() => handleOpenDialog(c)}>
                    Contact Lawyer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tools & Resources */}
      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
        }}
      >
        {tools.map((tool, index) => (
          <Card
            key={index}
            style={{
              padding: "16px",
              cursor: "pointer",
              backgroundColor: "#1e2a38",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <Link to={tool.link} style={{ textDecoration: "none", color: "inherit" }}>
              <CardContent>
                <tool.icon size={40} style={{ color: "#4db8ff" }} />
                <p style={{ marginTop: "8px", fontWeight: "bold", color: "#b0bec5" }}>{tool.title}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Contact Lawyer Dialog */}
      <AnimatePresence>
        {openDialog && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle style={{ backgroundColor: "#1e2a38", color: "#4db8ff" }}>
                Contact Lawyer for {selectedCase?.title}
              </DialogTitle>
              <DialogContent
                style={{
                  backgroundColor: "#22303f",
                  padding: "24px",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                <List>
                  {(caseMessages[selectedCase?.id] || []).map((msg, index) => (
                    <ListItem
                      key={index}
                      style={{
                        backgroundColor: msg.sender === "Litigant" ? "#2c3e50" : "#34495e",
                        borderRadius: "8px",
                        margin: "8px 0",
                      }}
                    >
                      <ListItemText
                        primary={`${msg.sender}: ${msg.text}`}
                        secondary={msg.timestamp}
                        primaryTypographyProps={{ style: { color: "#b0bec5" } }}
                        secondaryTypographyProps={{ style: { color: "#7f8c8d" } }}
                      />
                    </ListItem>
                  ))}
                </List>
                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                  <TextField
                    autoFocus
                    fullWidth
                    variant="outlined"
                    label="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginRight: "16px", backgroundColor: "white", borderRadius: "4px" }}
                    disabled={loading}
                  />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#4db8ff", color: "white" }}
                    onClick={handleSendMessage}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Send"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
