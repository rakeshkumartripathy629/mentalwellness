const express = require("express");
const router = express.Router();
const { getMySubscription, createOrUpdateSubscription } = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

// Get subscription
router.get("/me", protect, getMySubscription);

// Create/Update subscription manually
router.post("/create", protect, createOrUpdateSubscription);

module.exports = router;
