const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/apiResponse");
const {
  createOrUpdateProfile,
  listTherapists,
  updateOnlineStatus,
} = require("../services/therapistService");

const upsertMyProfile = catchAsync(async (req, res) => {
  const profile = await createOrUpdateProfile(req.user._id, req.body);
  return success(res, { profile }, "Therapist profile saved");
});

const getTherapists = catchAsync(async (req, res) => {
  const { specialty, language, onlineStatus } = req.query;
  const therapists = await listTherapists({
    specialty,
    language,
    onlineStatus,
  });
  return success(res, { therapists }, "Therapists fetched");
});

const setOnlineStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const profile = await updateOnlineStatus(req.user._id, status);
  return success(res, { profile }, "Status updated");
});

module.exports = {
  upsertMyProfile,
  getTherapists,
  setOnlineStatus,
};
