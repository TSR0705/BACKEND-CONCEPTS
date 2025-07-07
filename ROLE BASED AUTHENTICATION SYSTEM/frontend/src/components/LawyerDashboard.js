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
import { Briefcase, BookOpen, MessageSquare, Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function LawyerDashboard() {
  const [cases] = useState([
    { id: 1, title: "Case 201: Doe vs. Roe", status: "Active", client: "John Doe", lastInteraction: "2025-03-09 14:30" },
    { id: 2, title: "Case 202: State vs. Black", status: "Pending", client: "Jane Black", lastInteraction: "2025-03-08 10:15" },
    { id: 3, title: "Case 203: Green vs. White", status: "Closed", client: "Mark Green", lastInteraction: "2025-03-07 09:00" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [message, setMessage] = useState("");
  const [clientMessages, setClientMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    let timer;
    if (openDialog && selectedClient && clientMessages[selectedClient]?.length) {
      const lastMessage = clientMessages[selectedClient].slice(-1)[0];
      if (lastMessage.sender === "Lawyer") {
        timer = setTimeout(() => {
          setClientMessages((prev) => ({
            ...prev,
            [selectedClient]: [
              ...prev[selectedClient],
              { sender: "Client", text: `Thank you for the update, ${selectedClient}!`, timestamp: new Date().toLocaleString() },
            ],
          }));
        }, 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [openDialog, selectedClient, clientMessages]);

  const handleOpenDialog = (client) => {
    setSelectedClient(client);
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
      setClientMessages((prev) => ({
        ...prev,
        [selectedClient]: [
          ...(prev[selectedClient] || []),
          { sender: "Lawyer", text: message, timestamp: new Date().toLocaleString() },
        ],
      }));
      setMessage("");
      setLoading(false);
      setSnackbar({ open: true, message: "Message sent successfully!", severity: "success" });
    }, 500);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const tools = [
    { icon: BookOpen, title: "Case Law Search", link: "/search" },
    { icon: MessageSquare, title: "AI Legal Chatbot", link: "/chatbot" },
    { icon: Users, title: "Client Interactions", infoOnly: true },
    { icon: Globe, title: "Virtual Courtroom", link: "/courtroom" },
  ];

  return (
    <div style={{ backgroundColor: "#141e30", minHeight: "100vh", color: "white", padding: "32px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#4db8ff", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <Briefcase size={40} /> Lawyer Dashboard
        </h1>
        <p style={{ color: "#b0bec5", marginTop: "8px" }}>Manage legal proceedings and client interactions seamlessly.</p>
      </motion.div>

      {/* Case Management */}
      <div style={{ marginTop: "40px", backgroundColor: "#1e2a38", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#4db8ff", marginBottom: "16px" }}>Your Cases</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Case Title</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Client</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Last Interaction</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4db8ff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((c) => (
              <TableRow key={c.id} style={{ backgroundColor: "#22303f" }}>
                <TableCell style={{ color: "#b0bec5" }}>{c.title}</TableCell>
                <TableCell style={{ color: c.status === "Active" ? "#ffcc00" : c.status === "Pending" ? "#ff4444" : "#00c851" }}>
                  {c.status}
                </TableCell>
                <TableCell style={{ color: "#b0bec5" }}>{c.client}</TableCell>
                <TableCell style={{ color: "#b0bec5" }}>{c.lastInteraction}</TableCell>
                <TableCell>
                  <Link to={`/case-details/${c.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" style={{ backgroundColor: "#007bff", color: "white", marginRight: "8px" }}>
                      View Details
                    </Button>
                  </Link>
                  <Button variant="contained" style={{ backgroundColor: "#4db8ff", color: "white" }} onClick={() => handleOpenDialog(c.client)}>
                    Interact
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tools & Resources */}
      <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
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
            onClick={() =>
              tool.infoOnly
                ? setSnackbar({ open: true, message: "Use 'Interact' button on cases for client-specific interactions.", severity: "info" })
                : null
            }
          >
            <CardContent>
              <tool.icon size={40} style={{ color: "#4db8ff" }} />
              {tool.link ? (
                <Link to={tool.link} style={{ textDecoration: "none", color: "inherit" }}>
                  <p style={{ marginTop: "8px", fontWeight: "bold", color: "#b0bec5" }}>{tool.title}</p>
                </Link>
              ) : (
                <p style={{ marginTop: "8px", fontWeight: "bold", color: "#b0bec5" }}>{tool.title}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Client Interaction Dialog */}
      <AnimatePresence>
        {openDialog && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle style={{ backgroundColor: "#1e2a38", color: "#4db8ff" }}>
                Interact with {selectedClient}
              </DialogTitle>
              <DialogContent style={{ backgroundColor: "#22303f", padding: "24px", maxHeight: "60vh", overflowY: "auto" }}>
                <List>
                  {(clientMessages[selectedClient] || []).map((msg, index) => (
                    <ListItem key={index} style={{ backgroundColor: msg.sender === "Lawyer" ? "#2c3e50" : "#34495e", borderRadius: "8px", margin: "8px 0" }}>
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
                  <Button variant="contained" style={{ backgroundColor: "#4db8ff", color: "white" }} onClick={handleSendMessage} disabled={loading}>
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
