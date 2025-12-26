const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const JournalEntry = require("../models/JournalEntry");

const addJournal = catchAsync(async (req, res) => {
  const { title, content, moodTag } = req.body;
  const journal = await JournalEntry.create({
    user: req.user._id,
    title,
    content,
    moodTag,
  });
  return success(res, { journal }, "Journal created", 201);
});

const getMyJournals = catchAsync(async (req, res) => {
  const journals = await JournalEntry.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  return success(res, { journals }, "Journals fetched");
});

module.exports = { addJournal, getMyJournals };
