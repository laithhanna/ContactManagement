// NavigationButtons.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Box } from "@mui/material";

const NavigationButtons = ({ isSubmitting, submitForm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterPage = location.pathname === "/register";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        onClick={submitForm}
      >
        {isRegisterPage ? "Register" : "Login"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(isRegisterPage ? "/login" : "/register")}
      >
        {isRegisterPage ? "Login" : "Register"}
      </Button>
    </Box>
  );
};

export default NavigationButtons;
