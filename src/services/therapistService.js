const TherapistProfile = require("../models/TherapistProfile");
const User = require("../models/User");
const { ROLES } = require("../utils/constants");

const createOrUpdateProfile = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user || user.role !== ROLES.COACH) {
    throw new Error("Only therapists can have profiles");
  }

  const profile = await TherapistProfile.findOneAndUpdate(
    { user: userId },
    { ...data },
    { new: true, upsert: true }
  );
  return profile;
};

const listTherapists = async (filters = {}) => {
  const query = { isActive: true };

  if (filters.specialty) query.specialties = filters.specialty;
  if (filters.language) query.languages = filters.language;
  if (filters.onlineStatus) query.onlineStatus = filters.onlineStatus;

  const therapists = await TherapistProfile.find(query).populate(
    "user",
    "name email"
  );
  return therapists;
};

const updateOnlineStatus = async (userId, status) => {
  const profile = await TherapistProfile.findOneAndUpdate(
    { user: userId },
    { onlineStatus: status },
    { new: true }
  );
  return profile;
};

module.exports = {
  createOrUpdateProfile,
  listTherapists,
  updateOnlineStatus,
};
