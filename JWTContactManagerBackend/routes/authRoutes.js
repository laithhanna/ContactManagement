const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

router.get("/validate", validateToken, (req, res) => {
  // If the token is valid, the middleware will call next() and this route will handle the response
  res.json({ isAuthenticated: true });
});

module.exports = router;
