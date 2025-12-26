const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createMyHabit, getMyHabits, logMyHabit, getMyHabitLogs } = require("../controllers/habitController");

router.post("/", protect, createMyHabit);
router.get("/", protect, getMyHabits);
router.post("/log", protect, logMyHabit);
router.get("/:habitId/logs", protect, getMyHabitLogs);

module.exports = router;
