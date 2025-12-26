const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getMyInsights } = require("../controllers/insightController");

router.get("/me", protect, getMyInsights);

module.exports = router;
