const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const { getProfile, updateProfile } = require("../services/userService");

const getMe = catchAsync(async (req, res) => {
  const user = await getProfile(req.user._id);
  return success(res, { user }, "User profile");
});

const updateMe = catchAsync(async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  return success(res, { user }, "Profile updated");
});

module.exports = { getMe, updateMe };
