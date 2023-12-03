// Login.js
import React from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import NavigationButtons from "./NavigateButtons";

const Login = () => {
  // This will be updated later with actual login logic

  const submitLoginForm = () => {
    // Logic to handle login submission will go here
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
          {/* Form will go here */}
          <form>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
          </form>
          <NavigationButtons
            isSubmitting={false}
            submitForm={submitLoginForm}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
