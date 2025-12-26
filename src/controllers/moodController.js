const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const MoodEntry = require("../models/MoodEntry");

const addMood = catchAsync(async (req, res) => {
  const { score, emotion, note } = req.body;
  const mood = await MoodEntry.create({
    user: req.user._id,
    score,
    emotion,
    note,
  });
  return success(res, { mood }, "Mood logged", 201);
});

const getMyMoods = catchAsync(async (req, res) => {
  const moods = await MoodEntry.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  return success(res, { moods }, "Moods fetched");
});

module.exports = { addMood, getMyMoods };
