const ChatMessage = require("../models/ChatMessage");
const MoodEntry = require("../models/MoodEntry");
const { getAIResponse } = require("./aiService");

/* ---------------------------------------------------
   1. LATEST MOOD
--------------------------------------------------- */
const getLatestMood = async (userId) => {
  const lastMood = await MoodEntry.findOne({ user: userId }).sort({
    createdAt: -1,
  });

  if (!lastMood) return null;

  return {
    score: lastMood.score,
    emotion: lastMood.emotion,
  };
};

/* ---------------------------------------------------
   2. CHAT HISTORY
--------------------------------------------------- */
const getConversationHistory = async (userId, limit = 10) => {
  const messages = await ChatMessage.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return messages.reverse().map((m) => ({
    role: m.role,
    content: m.content,
  }));
};

/* ---------------------------------------------------
   3. CRISIS KEYWORD CHECK
--------------------------------------------------- */
const crisisKeywords = [
  "suicide",
  "kill myself",
  "self harm",
  "end my life",
  "hurt myself",
  "can't live",
  "want to die",
  "marna",
  "marna chahta",
  "marna chahti",
  "khud ko nuksan",
];

const checkCrisis = (text) => {
  const lower = text.toLowerCase();
  return crisisKeywords.some((keyword) => lower.includes(keyword));
};

/* ---------------------------------------------------
   4. DEFAULT CRISIS RESPONSE
--------------------------------------------------- */
const generateCrisisReply = () => {
  return (
    "I'm really glad you shared this with me. It sounds like you're going through something extremely painful.\n\n" +
    "I’m here to support you, but I am **not a replacement for emergency assistance**.\n\n" +
    "**If you feel you might be in danger**, please reach out to one of the following right now:\n" +
    "• A trusted friend or family member\n" +
    "• Your local emergency number\n" +
    "• Suicide prevention helpline in your country\n\n" +
    "You don’t have to go through this alone — you deserve help and care. 💛"
  );
};

/* ---------------------------------------------------
   5. HANDLE USER MESSAGE
--------------------------------------------------- */
const handleUserMessage = async (user, userMessage) => {
  const userId = user._id;
  const moodSnapshot = await getLatestMood(userId);

  // Save USER message
  await ChatMessage.create({
    user: userId,
    role: "user",
    content: userMessage,
    moodSnapshot,
  });

  /* ---------------------------------------
     CRISIS DETECTION & SAFE RESPONSE
  --------------------------------------- */
  if (checkCrisis(userMessage)) {
    const crisisReply = generateCrisisReply();

    await ChatMessage.create({
      user: userId,
      role: "assistant",
      content: crisisReply,
      moodSnapshot,
    });

    return crisisReply;
  }

  /* ---------------------------------------
     NORMAL AI CHAT RESPONSE
  --------------------------------------- */
  const history = await getConversationHistory(userId, 15);

  const aiReply = await getAIResponse({
    mood: moodSnapshot,
    messages: history,
  });

  // Save AI message
  const assistantMsg = await ChatMessage.create({
    user: userId,
    role: "assistant",
    content: aiReply,
    moodSnapshot,
  });

  return assistantMsg.content;
};

/* ---------------------------------------------------
   EXPORTS
--------------------------------------------------- */
module.exports = {
  handleUserMessage,
  getConversationHistory,
};
