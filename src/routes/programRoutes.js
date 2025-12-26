const express = require("express");
const router = express.Router();
const { createProgram, getPrograms } = require("../controllers/programController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const { ROLES } = require("../Utils/constants");

router.post("/", protect, restrictTo(ROLES.ADMIN), createProgram);
router.get("/", protect, getPrograms);

module.exports = router;
