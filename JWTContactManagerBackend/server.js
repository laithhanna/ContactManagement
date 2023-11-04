const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use("/api/contacts", (req, res) => {
  res.status(200).json({ message: "Test" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
