const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const Activity = require("../models/Activity");

const createActivity = catchAsync(async (req, res) => {
  const activity = await Activity.create(req.body);
  return success(res, { activity }, "Activity created", 201);
});

const getActivities = catchAsync(async (req, res) => {
  const { category, type } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (type) filter.type = type;
  const activities = await Activity.find(filter);
  return success(res, { activities }, "Activities fetched");
});

module.exports = { createActivity, getActivities };
