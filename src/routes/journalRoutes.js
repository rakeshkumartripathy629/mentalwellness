const express = require("express");
const router = express.Router();
const { addJournal, getMyJournals } = require("../controllers/journalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addJournal);
router.get("/", protect, getMyJournals);

module.exports = router;
