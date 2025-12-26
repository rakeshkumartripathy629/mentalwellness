// const { hashValue, compareHash } = require("../Utils/cryptoUtils");
// const OtpCode = require("../models/OtpCode");

// const generateOtp = () =>
//   Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

// const createAndSendOtp = async (phone, purpose, smsService) => {
//   const otp = generateOtp();
//   const codeHash = await hashValue(otp);
//   const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//   // Purane unused OTP clean
//   await OtpCode.deleteMany({ phone, purpose, used: false });

//   // DB me save
//   await OtpCode.create({
//     phone,
//     codeHash,
//     purpose,
//     expiresAt,
//   });

//   // Twilio se SMS bhejo
//   await smsService.sendOtpSms(phone, otp, purpose);
// };

// const verifyOtp = async (phone, purpose, otp) => {
//   const record = await OtpCode.findOne({
//     phone,
//     purpose,
//     used: false,
//     expiresAt: { $gt: new Date() },
//   }).sort({ createdAt: -1 });

//   if (!record) return false;

//   const isMatch = await compareHash(otp, record.codeHash);
//   if (!isMatch) return false;

//   record.used = true;
//   await record.save();

//   return true;
// };

// module.exports = {
//   createAndSendOtp,
//   verifyOtp,
// };



// src/services/phoneOtpService.js
const PhoneOtp = require("../models/OtpCode");
const { hashValue, compareHash } = require("../Utils/cryptoUtils");
const { sendOtpSms } = require("./smsService");

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

const createAndSendPhoneOtp = async (phone, purpose) => {
  const otp = generateOtp();
  const codeHash = await hashValue(otp);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // Purane unused OTP clean karo
  await PhoneOtp.deleteMany({ phone, purpose, used: false });

  await PhoneOtp.create({
    phone,
    codeHash,
    purpose,
    expiresAt,
  });

  // SMS bhejo
  await sendOtpSms(phone, otp, purpose);
};

const verifyPhoneOtp = async (phone, purpose, otp) => {
  const record = await PhoneOtp.findOne({
    phone,
    purpose,
    used: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!record) return false;

  const isMatch = await compareHash(otp, record.codeHash);
  if (!isMatch) return false;

  record.used = true;
  await record.save();
  return true;
};

module.exports = {
  createAndSendPhoneOtp,
  verifyPhoneOtp,
};
