const config = require("./config/config");
const connectDB = require("./config/db");
const app = require(".");
const logger = require("./config/logger");
require("./jobs/index");

connectDB();

const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
});

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! Shutting down...");
  logger.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! Shutting down...");
  logger.error(err);
  server.close(() => {
    process.exit(1);
  });
});
