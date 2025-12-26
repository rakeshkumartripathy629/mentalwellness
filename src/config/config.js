// require("dotenv").config();

// const config = {
//   env: process.env.NODE_ENV || "development",
//   port: process.env.PORT || 5000,
//   mongoUri: process.env.MONGO_URI,
//   jwt: {
//     secret: process.env.JWT_SECRET,
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   },
//   clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
//   rateLimit: {
//     windowMs: 15 * 60 * 1000,
//     maxRequests: 100,
//   },
// };

// module.exports = config;

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,

  // ⭐ Hardcoded fallback MongoDB URL
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://rakeshkumartripathy075_db_user:S0KehykogYBhI9LW@cluster0.lxwe31x.mongodb.net/", // fallback DB URL

  jwt: {
    secret: process.env.JWT_SECRET || "supersecretjwtkey",  // fallback JWT secret
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  },
};

module.exports = config;
