import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

// Intercept response and check for 401 Unauthorized response
axios.interceptors.response.use(
  (response) => response, // If the response is successful, do nothing
  (error) => {
    if (error.response && error.response.status === 401) {
      // If you receive a 401, redirect to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
