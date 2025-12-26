const User = require("../models/User");

const getProfile = async (userId) => {
  return User.findById(userId).select("-password");
};

const updateProfile = async (userId, updates) => {
  delete updates.password;
  return User.findByIdAndUpdate(userId, updates, { new: true });
};

module.exports = { getProfile, updateProfile };
