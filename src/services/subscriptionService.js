const Subscription = require("../models/Subscription");

const getUserSubscription = async (userId) => {
  return Subscription.findOne({ user: userId }).sort({ createdAt: -1 });
};

// Create or Update subscription
const setUserSubscription = async (userId, { plan, start, end }) => {
  let sub = await Subscription.findOne({ user: userId });

  if (!sub) {
    sub = await Subscription.create({
      user: userId,
      plan,
      currentPeriodStart: start,
      currentPeriodEnd: end,
      status: "ACTIVE",
    });
  } else {
    sub.plan = plan;
    sub.currentPeriodStart = start;
    sub.currentPeriodEnd = end;
    sub.status = "ACTIVE";
    await sub.save();
  }

  return sub;
};

module.exports = {
  getUserSubscription,
  setUserSubscription
};
