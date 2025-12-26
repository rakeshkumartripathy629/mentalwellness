const express = require("express");
const router = express.Router();
const { createActivity, getActivities } = require("../controllers/activityController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const { ROLES } = require("../Utils/constants");

router.post("/", protect, restrictTo(ROLES.ADMIN), createActivity);
router.get("/", protect, getActivities);

module.exports = router;
