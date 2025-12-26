const logger = require("../config/logger");
const config = require("../config/config");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(config.env === "development" ? { stack: err.stack } : {}),
  });
};

module.exports = { notFound, errorHandler };
