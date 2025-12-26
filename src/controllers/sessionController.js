const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/apiResponse");
const {
  createSession,
  getUserSessions,
  getTherapistSessions,
  updateSessionStatus,
} = require("../services/sessionService");
const { ROLES } = require("../utils/constants");

const bookSession = catchAsync(async (req, res) => {
  const { therapistId, scheduledAt, durationMinutes, notesForTherapist } =
    req.body;

  const session = await createSession({
    userId: req.user._id,
    therapistId,
    scheduledAt,
    durationMinutes,
    notesForTherapist,
  });

  return success(res, { session }, "Session booked", 201);
});

const mySessionsAsUser = catchAsync(async (req, res) => {
  const sessions = await getUserSessions(req.user._id);
  return success(res, { sessions }, "Sessions fetched");
});

const mySessionsAsTherapist = catchAsync(async (req, res) => {
  if (req.user.role !== ROLES.COACH) {
    res.status(403);
    throw new Error("Only therapists can access this");
  }
  const sessions = await getTherapistSessions(req.user._id);
  return success(res, { sessions }, "Sessions fetched");
});

const changeSessionStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const session = await updateSessionStatus(id, req.user._id, status);
  return success(res, { session }, "Session updated");
});

module.exports = {
  bookSession,
  mySessionsAsUser,
  mySessionsAsTherapist,
  changeSessionStatus,
};
