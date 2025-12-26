const twilio = require("twilio");

// ENV VARIABLES
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  console.warn(
    "⚠️ Twilio env vars not fully set. SMS sending will fail until configured."
  );
}

const client =
  accountSid && authToken ? twilio(accountSid, authToken) : null;

const sendOtpSms = async (to, otp, purpose = "Verification") => {
  if (!client) {
    throw new Error("Twilio is not configured properly.");
  }

  const body = `Your OTP code for ${purpose} is ${otp}. It will expire in 10 minutes.`;

  await client.messages.create({
    body,
    from: fromNumber,
    to,
  });
};

module.exports = { sendOtpSms };
