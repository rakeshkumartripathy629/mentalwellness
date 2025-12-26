const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { ROLES } = require("../utils/constants");
const { bookSession, mySessionsAsUser, mySessionsAsTherapist, changeSessionStatus } = require("../controllers/sessionController");

router.post("/", protect, bookSession); // user books

router.get("/me", protect, mySessionsAsUser);
router.get(
  "/therapist/me",
  protect,
  (req, res, next) => {
    if (req.user.role !== ROLES.COACH) {
      res.status(403);
      return next(new Error("Only therapists can access"));
    }
    next();
  },
  mySessionsAsTherapist
);

router.patch("/:id/status", protect, changeSessionStatus);

module.exports = router;
