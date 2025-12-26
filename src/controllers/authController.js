// const catchAsync = require("../Utils/catchAsync");
// const { success } = require("../Utils/apiResponse");

// const {
//   registerUser,
//   loginUser,
//   generateToken,
// } = require("../services/authService");

// const { createAndSendOtp, verifyOtp } = require("../services/otpService");
// const { sendOtpSms } = require("../services/smsService");

// const User = require("../models/User");

// /**
//  * Register using name + email + password
//  */
// const register = catchAsync(async (req, res) => {
//   const { name, email, password, phone } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Name, email & password are required");
//   }

//   const { user, token } = await registerUser({ name, email, password, phone });

//   return success(res, { user, token }, "User registered", 201);
// });

// /**
//  * Login using email + password
//  */
// const login = catchAsync(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400);
//     throw new Error("Email & password are required");
//   }

//   const { user, token } = await loginUser({ email, password });

//   return success(res, { user, token }, "Logged in successfully");
// });

// /**
//  * Send OTP via Twilio SMS
//  * Purpose: VERIFY_PHONE | LOGIN | FORGOT_PASSWORD
//  */
// const sendOtp = catchAsync(async (req, res) => {
//   const { phone, purpose } = req.body;

//   if (!phone || !purpose) {
//     res.status(400);
//     throw new Error("Phone and purpose are required");
//   }

//   await createAndSendOtp(phone, purpose, { sendOtpSms });

//   return success(res, {}, "OTP sent via SMS");
// });

// /**
//  * Verify OTP for login or phone verification
//  */
// const verifyOtpController = catchAsync(async (req, res) => {
//   const { phone, purpose, otp, name, email, password } = req.body;

//   if (!phone || !purpose || !otp) {
//     res.status(400);
//     throw new Error("Phone, purpose and OTP are required");
//   }

//   // Verify OTP
//   const isValid = await verifyOtp(phone, purpose, otp);

//   if (!isValid) {
//     res.status(400);
//     throw new Error("Invalid or expired OTP");
//   }

//   // -------- PHONE VERIFICATION FLOW --------
//   if (purpose === "VERIFY_PHONE") {
//     let user = await User.findOne({ phone });

//     // ⭐ NEW USER (Auto-create with only phone)
//     if (!user) {
//       user = new User({
//         name: name || `User-${phone.slice(-4)}`,          // auto name
//         email: email || null,                             // optional
//         password: password || null,                       // optional
//         phone,
//         phoneVerified: true
//       });

//       await user.save();
//     } else {
//       user.phoneVerified = true;
//       await user.save();
//     }

//     const token = generateToken(user._id);

//     return success(res, { token, user }, "Phone verified & logged in");
//   }

//   // -------- OTP LOGIN FLOW --------
//   if (purpose === "LOGIN") {
//     const user = await User.findOne({ phone });

//     if (!user) {
//       res.status(404);
//       throw new Error("User not found with this phone");
//     }

//     const token = generateToken(user._id);

//     return success(res, { token, user }, "Logged in via OTP");
//   }

//   // -------- FORGOT PASSWORD FLOW (Future) --------
//   if (purpose === "FORGOT_PASSWORD") {
//     return success(res, {}, "OTP verified for password reset");
//   }

//   return success(res, {}, "OTP verified");
// });


// module.exports = {
//   register,
//   login,
//   sendOtp,
//   verifyOtpController,
// };



// src/controllers/authController.js

const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const User = require("../models/User");

const { registerUser, loginUser, generateToken } = require("../services/authService");

const { createAndSendOtp, verifyOtp } = require("../services/otpService");
const { sendOtpEmail } = require("../services/mailService");

const { createAndSendPhoneOtp, verifyPhoneOtp } = require("../services/otpService");



/* ============================================================
   1) EMAIL/PASSWORD REGISTER
   ============================================================ */
const register = catchAsync(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email && !phone) {
    res.status(400);
    throw new Error("Either email or phone is required");
  }

  const { user, token } = await registerUser({
    name,
    email,
    phone,
    password,
  });

  return success(res, { user, token }, "User registered successfully", 201);
});



/* ============================================================
   2) EMAIL/PASSWORD LOGIN
   ============================================================ */
const login = catchAsync(async (req, res) => {
  const { email, phone, password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Password is required for password-login");
  }

  if (!email && !phone) {
    res.status(400);
    throw new Error("Email or phone is required for login");
  }

  const { user, token } = await loginUser({
    email,
    phone,
    password,
  });

  return success(res, { user, token }, "Logged in successfully");
});



/* ============================================================
   3) SEND EMAIL OTP (Signup/Login/Forgot)
   ============================================================ */
const sendOtp = catchAsync(async (req, res) => {
  const { email, purpose } = req.body;

  if (!email || !purpose) {
    res.status(400);
    throw new Error("Email and purpose are required");
  }

  await createAndSendOtp(email, purpose, { sendOtpEmail });

  return success(res, {}, "Email OTP sent");
});



/* ============================================================
   4) VERIFY EMAIL OTP
   ============================================================ */
const verifyOtpController = catchAsync(async (req, res) => {
  const { email, otp, purpose, name, password } = req.body;

  if (!email || !purpose || !otp) {
    res.status(400);
    throw new Error("Email, purpose and OTP are required");
  }

  const isValid = await verifyOtp(email, purpose, otp);

  if (!isValid) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  // ---------- EMAIL VERIFY FLOW ----------
  if (purpose === "VERIFY_EMAIL") {
    let user = await User.findOne({ email });

    // If user doesn't exist, create new (OTP signup)
    if (!user) {
      if (!name) {
        res.status(400);
        throw new Error("Name is required for new user signup");
      }

      user = new User({
        name,
        email,
        password: password || null,
        emailVerified: true,
      });

      await user.save();
    } else {
      user.emailVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);

    return success(res, { token, user }, "Email verified successfully");
  }

  // ---------- EMAIL OTP LOGIN ----------
  if (purpose === "LOGIN") {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const token = generateToken(user._id);

    return success(res, { token, user }, "Logged in using email OTP");
  }

  return success(res, {}, "OTP verified");
});



/* ============================================================
   5) SEND PHONE OTP (Twilio/MSG91)
   ============================================================ */
const sendPhoneOtp = catchAsync(async (req, res) => {
  const { phone, purpose } = req.body;

  if (!phone || !purpose) {
    res.status(400);
    throw new Error("Phone and purpose are required");
  }

  await createAndSendPhoneOtp(phone, purpose);

  return success(res, {}, "SMS OTP sent");
});



/* ============================================================
   6) VERIFY PHONE OTP
   ============================================================ */
const verifyPhoneOtpController = catchAsync(async (req, res) => {
  const { phone, otp, purpose, name } = req.body;

  if (!phone || !purpose || !otp) {
    res.status(400);
    throw new Error("Phone, purpose and OTP are required");
  }

  const isValid = await verifyPhoneOtp(phone, purpose, otp);

  if (!isValid) {
    res.status(400);
    throw new Error("Invalid or expired phone OTP");
  }

  // --------- VERIFY PHONE FLOW ----------
  if (purpose === "VERIFY_PHONE") {
    let user = await User.findOne({ phone });

    // Auto-create user if OTP signup
    if (!user) {
      if (!name) {
        res.status(400);
        throw new Error("Name is required for phone signup");
      }

      user = new User({
        name,
        phone,
        phoneVerified: true,
      });

      await user.save();
    } else {
      user.phoneVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);

    return success(res, { token, user }, "Phone verified successfully");
  }

  // --------- PHONE LOGIN FLOW ----------
  if (purpose === "LOGIN_PHONE") {
    const user = await User.findOne({ phone });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const token = generateToken(user._id);

    return success(res, { token, user }, "Logged in using SMS OTP");
  }

  return success(res, {}, "Phone OTP verified");
});



/* ============================================================
   EXPORT
   ============================================================ */
module.exports = {
  register,
  login,
  sendOtp,
  verifyOtpController,
  sendPhoneOtp,
  verifyPhoneOtpController,
};
