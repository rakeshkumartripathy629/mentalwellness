const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middleware/authMiddleware");
const { ROLES } = require("../utils/constants");
const {
  upsertMyProfile,
  getTherapists,
  setOnlineStatus,
} = require("../controllers/therapistController");

// Public listing for users (requires login)
router.get("/", protect, getTherapists);

// Therapist-only
router.put("/me/profile", protect, restrictTo(ROLES.COACH), upsertMyProfile);
router.put("/me/status", protect, restrictTo(ROLES.COACH), setOnlineStatus);

module.exports = router;
