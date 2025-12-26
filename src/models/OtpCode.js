// src/models/PhoneOtp.js
const mongoose = require("mongoose");

const phoneOtpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    codeHash: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["VERIFY_PHONE", "LOGIN_PHONE"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

phoneOtpSchema.index({ phone: 1, purpose: 1 });

const PhoneOtp = mongoose.model("PhoneOtp", phoneOtpSchema);
module.exports = PhoneOtp;

