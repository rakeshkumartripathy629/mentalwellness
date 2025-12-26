const express = require("express");
const router = express.Router();
const { addMood, getMyMoods } = require("../controllers/moodController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addMood);
router.get("/", protect, getMyMoods);

module.exports = router;
