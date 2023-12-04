// Login.js
import React, { useState } from "react";
import axios from "../axios";
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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email || !password) {
      setError("All fields are required");
      setOpenErrorModal(true);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post("/api/users/login", formData, {
        withCredentials: true,
      });
      // Handle login success (e.g., navigate to dashboard or store token)
      console.log(response.data);
      setIsSubmitting(false);

      navigate("/dashboard");
      // navigate('/dashboard'); // Uncomment and update with your success route
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred during login";
      setError(errorMessage);
      setOpenErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenErrorModal(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ minWidth: 275, maxWidth: 500, m: 2 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1">
              Login
            </Typography>
          </Box>
          <form onSubmit={submitLoginForm}>
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
            submitForm={submitLoginForm}
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
    </Box>
  );
};

export default Login;
