// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "../axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Function to fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/contacts", {
        withCredentials: true,
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  // Function to fetch current user details
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/current", {
        withCredentials: true,
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchCurrentUser();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hello, {username}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Create Contact
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="contacts table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {contact.name}
                </TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">{contact.phone}</TableCell>
                <TableCell align="right">
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
