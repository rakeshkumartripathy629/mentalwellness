const SessionBooking = require("../models/SessionBooking");
const { v4: uuidv4 } = require("uuid");

const buildMeetingLink = () => {
  const base = process.env.MEETING_BASE_URL || "https://meet.example.com";
  const room = uuidv4();
  return `${base}/${room}`;
};

const createSession = async ({
  userId,
  therapistId,
  scheduledAt,
  durationMinutes,
  notesForTherapist,
}) => {
  const meetingLink = buildMeetingLink();

  const session = await SessionBooking.create({
    user: userId,
    therapist: therapistId,
    scheduledAt,
    durationMinutes,
    status: "CONFIRMED",
    meetingLink,
    notesForTherapist,
    createdBy: userId,
  });

  return session;
};

const getUserSessions = async (userId) => {
  return SessionBooking.find({ user: userId })
    .populate("therapist", "name email")
    .sort({ scheduledAt: -1 });
};

const getTherapistSessions = async (therapistId) => {
  return SessionBooking.find({ therapist: therapistId })
    .populate("user", "name email")
    .sort({ scheduledAt: -1 });
};

const updateSessionStatus = async (sessionId, userId, status) => {
  const session = await SessionBooking.findOne({ _id: sessionId });

  if (!session) throw new Error("Session not found");

  // simple check: user or therapist can update
  if (
    String(session.user) !== String(userId) &&
    String(session.therapist) !== String(userId)
  ) {
    throw new Error("Not allowed to update this session");
  }

  session.status = status;
  await session.save();
  return session;
};

module.exports = {
  createSession,
  getUserSessions,
  getTherapistSessions,
  updateSessionStatus,
};
