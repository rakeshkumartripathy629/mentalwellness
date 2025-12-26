const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { create, list, submit } = require("../controllers/assessmentController");

router.post("/", protect, create); // admin only, check in controller
router.get("/", protect, list);
router.post("/submit", protect, submit);

module.exports = router;
