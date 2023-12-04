const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User is not authorized" });
    }
    //intercept the request. Decode the token. Append the user info on the req.user property
    req.user = decoded.user;
    next();
  });
});

module.exports = validateToken;
