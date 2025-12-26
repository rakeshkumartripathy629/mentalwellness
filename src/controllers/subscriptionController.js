const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const { getUserSubscription, setUserSubscription } = require("../services/subscriptionService");

// GET my subscription
const getMySubscription = catchAsync(async (req, res) => {
  const sub = await getUserSubscription(req.user._id);
  return success(res, { subscription: sub }, "Subscription fetched");
});

// CREATE or UPDATE subscription
const createOrUpdateSubscription = catchAsync(async (req, res) => {
  const { plan, periodStart, periodEnd } = req.body;

  if (!plan || !periodStart || !periodEnd) {
    res.status(400);
    throw new Error("plan, periodStart and periodEnd are required");
  }

  const newSub = await setUserSubscription(req.user._id, {
    plan,
    start: periodStart,
    end: periodEnd
  });

  return success(res, { subscription: newSub }, "Subscription updated");
});

module.exports = {
  getMySubscription,
  createOrUpdateSubscription,
};
