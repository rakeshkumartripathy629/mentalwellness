const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const { handleUserMessage, getConversationHistory } = require("../services/chatService");

const sendMessage = catchAsync(async (req, res) => {
  const { message } = req.body;
  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  const reply = await handleUserMessage(req.user, message);
  return success(res, { reply }, "AI reply generated");
});

const getHistory = catchAsync(async (req, res) => {
  const history = await getConversationHistory(req.user._id, 20);
  return success(res, { history }, "Chat history");
});

module.exports = { sendMessage, getHistory };
