const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/apiResponse");
const Insight = require("../models/Insight");

const getMyInsights = catchAsync(async (req, res) => {
  const insights = await Insight.find({ user: req.user._id }).sort({ createdAt: -1 });
  return success(res, { insights }, "Insights fetched");
});

module.exports = { getMyInsights };
