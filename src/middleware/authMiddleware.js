const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
      return next();
    } catch (error) {
      res.status(401);
      return next(new Error("Not authorized, token failed"));
    }
  }

  res.status(401);
  next(new Error("Not authorized, no token"));
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error("You do not have permission"));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
