const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next(new Error("Missing JWT"));
    res.send("Missing JWT");
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = decoded;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticate;
