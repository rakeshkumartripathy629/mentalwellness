const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

const config = require("./config/config");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const { apiLimiter, authLimiter } = require("./middleware/rateLimitMiddleware");
const securityMiddleware = require("./middleware/securityMiddleware");
const swaggerSpec = require("./docs/swagger");

// -------------------------------------------
// ⭐ ROUTES IMPORTS
// -------------------------------------------
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const moodRoutes = require("./routes/moodRoutes");
const journalRoutes = require("./routes/journalRoutes");
const activityRoutes = require("./routes/activityRoutes");
const programRoutes = require("./routes/programRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");

// NEW FEATURE ROUTES
const therapistRoutes = require("./routes/therapistRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const habitRoutes = require("./routes/habitRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const insightRoutes = require("./routes/insightRoutes");

const app = express();

// -------------------------------------------
// ⭐ HARD-CODED FRONTEND URL CORS FIX
// -------------------------------------------
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// -------------------------------------------
// ⭐ SECURITY & MIDDLEWARE
// -------------------------------------------
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

securityMiddleware(app);

if (config.env === "development") {
  app.use(morgan("dev"));
}

// -------------------------------------------
// ⭐ HEALTH CHECK
// -------------------------------------------
app.get("/health", (req, res) => {
  res.json({ status: "ok", env: config.env });
});

// -------------------------------------------
// ⭐ API DOCUMENTATION - SWAGGER
// -------------------------------------------
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// -------------------------------------------
// ⭐ RATE LIMITERS
// -------------------------------------------
app.use("/api", apiLimiter); // global API limit
app.use("/api/auth", authLimiter, authRoutes); // strict for auth

// -------------------------------------------
// ⭐ MAIN ROUTES
// -------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/chat", chatRoutes);

// -------------------------------------------
// ⭐ NEW FEATURE ROUTES (Added Correctly)
// -------------------------------------------
app.use("/api/therapists", therapistRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/insights", insightRoutes);

// -------------------------------------------
// ⭐ Error Handling
// -------------------------------------------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
