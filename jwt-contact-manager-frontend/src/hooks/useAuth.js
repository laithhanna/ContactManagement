// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "../axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await axios.get("/api/auth/validate");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
