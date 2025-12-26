const Insight = require("../models/Insight");
const MoodEntry = require("../models/MoodEntry");
const JournalEntry = require("../models/JournalEntry");
const { getAIResponse } = require("./aiService");

const generateWeeklyMoodInsight = async (user) => {
  const userId = user._id;
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

  const moods = await MoodEntry.find({
    user: userId,
    createdAt: { $gte: start, $lte: end },
  }).lean();

  const journals = await JournalEntry.find({
    user: userId,
    createdAt: { $gte: start, $lte: end },
  }).lean();

  const moodText = moods
    .map(
      (m) => `Score: ${m.score}, Emotion: ${m.emotion}, Note: ${m.note || ""}`
    )
    .join("\n");

  const journalText = journals
    .map((j) => `${j.title}: ${j.content}`)
    .join("\n");

  const messages = [
    {
      role: "user",
      content:
        "Here is my last 7 days mood and journal data. Please give a short, kind insight (3-4 lines) about patterns and 1-2 gentle suggestions.\n\n" +
        moodText +
        "\n\n" +
        journalText,
    },
  ];

  const text = await getAIResponse({ mood: null, messages });

  const insight = await Insight.create({
    user: userId,
    type: "WEEKLY_MOOD",
    periodStart: start,
    periodEnd: end,
    text,
  });

  return insight;
};

module.exports = {
  generateWeeklyMoodInsight,
};
