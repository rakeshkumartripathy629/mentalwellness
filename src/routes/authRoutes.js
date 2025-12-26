// const express = require("express");
// const router = express.Router();
// const { register, login, sendOtp, verifyOtpController } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtpController);

// module.exports = router;


// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  sendOtp,
  verifyOtpController,
  sendPhoneOtp,
  verifyPhoneOtpController,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Email OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpController);

// 📱 Phone OTP
router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtpController);

module.exports = router;
