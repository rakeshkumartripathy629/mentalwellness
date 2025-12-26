const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOtpEmail = async (to, otp, purpose = "Verification") => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Your OTP Code for ${purpose}`,
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
  };

  await sgMail.send(msg);
};

module.exports = { sendOtpEmail };
