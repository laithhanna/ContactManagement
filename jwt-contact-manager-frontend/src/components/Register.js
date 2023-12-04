// Register.js
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "./NavigateButtons";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [error, setError] = useState("");

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!username || !email || !password) {
      setError("All fields are required");
      setOpenErrorModal(true);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post("/api/users/register", formData, {
        withCredentials: true,
      });
      console.log(response.data);
      setOpenSuccessModal(true);
      setFormData({ username: "", email: "", password: "" }); // Clear fields
    } catch (error) {
      setError(error.response.data.message);
      setOpenErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenErrorModal(false);
    setOpenSuccessModal(false);
  };

  const handleSubmitSuccess = () => {
    setOpenSuccessModal(false);
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1">
              Register
            </Typography>
          </Box>
          <form onSubmit={onSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={onChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={email}
              onChange={onChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              value={password}
              onChange={onChange}
              fullWidth
              margin="normal"
              type="password"
            />
          </form>
          <NavigationButtons
            isSubmitting={isSubmitting}
            submitForm={onSubmit}
          />
        </CardContent>
      </Card>

      {/* Error Modal */}
      <Dialog open={openErrorModal} onClose={handleClose}>
        <DialogTitle
          sx={{ backgroundColor: "error.main", color: "common.white" }}
        >
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={openSuccessModal} onClose={handleClose}>
        <DialogTitle
          sx={{ backgroundColor: "success.main", color: "common.white" }}
        >
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Registered successfully!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitSuccess}
            variant="contained"
            color="success"
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
