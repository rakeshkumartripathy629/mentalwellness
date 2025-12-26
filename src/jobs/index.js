const cron = require("node-cron");
const logger = require("../config/logger");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const SessionBooking = require("../models/SessionBooking");
const { generateWeeklyMoodInsight } = require("../services/insightService");

// Daily subscription status check – very simple stub
cron.schedule("0 9 * * *", async () => {
  logger.info("Running daily subscription check job");
  const now = new Date();
  await Subscription.updateMany(
    { currentPeriodEnd: { $lt: now }, status: "ACTIVE" },
    { status: "EXPIRED" }
  );
});

// Weekly insights job – run every Monday at 10 AM (day 1)
cron.schedule("0 10 * * 1", async () => {
  logger.info("Running weekly insights job");
  const users = await User.find({}); // in real case, paginate
  for (const user of users) {
    try {
      await generateWeeklyMoodInsight(user);
    } catch (err) {
      logger.error("Insight generation failed for user %s: %s", user._id, err.message);
    }
  }
});

// Session reminder – every 15 min
cron.schedule("*/15 * * * *", async () => {
  logger.info("Running session reminder job");
  const now = new Date();
  const in30 = new Date(now.getTime() + 30 * 60 * 1000);

  const upcoming = await SessionBooking.find({
    scheduledAt: { $gte: now, $lte: in30 },
    status: "CONFIRMED",
  }).populate("user therapist", "email name");

  // Yahan tum email/SMS/notification bhej sakte ho
  upcoming.forEach((session) => {
    logger.info(
      "Reminder session %s at %s for user %s and therapist %s",
      session._id,
      session.scheduledAt,
      session.user?.email,
      session.therapist?.email
    );
  });
});
