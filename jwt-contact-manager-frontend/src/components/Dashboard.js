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
import CreateContactForm from "./CreateContactForm";
import UpdateContactForm from "./UpdateContactForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [username, setUsername] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const navigate = useNavigate();

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateSuccess = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleOpenUpdateModal = (contact) => {
    setSelectedContact(contact);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedContact(null);
  };

  const handleUpdateSuccess = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact._id === updatedContact._id ? updatedContact : contact
      )
    );
    handleCloseUpdateModal();
  };

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

  // Function to delete a contact
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`/api/contacts/${contactId}`, {
        withCredentials: true,
      });
      // Filter out the deleted contact from the contacts state
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact", error);
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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hello, {username}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
        >
          Create Contact
        </Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
        <CreateContactForm
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
          handleCreateSuccess={handleCreateSuccess}
        />
      </Box>
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
                key={contact._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {contact.name}
                </TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">{contact.phone}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpenUpdateModal(contact)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteContact(contact._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedContact && (
        <UpdateContactForm
          open={openUpdateModal}
          handleClose={handleCloseUpdateModal}
          handleUpdateSuccess={handleUpdateSuccess}
          contact={selectedContact}
        />
      )}
    </Box>
  );
};

export default Dashboard;
