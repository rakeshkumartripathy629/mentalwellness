const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    moodSnapshot: {
      score: { type: Number, min: 1, max: 10 },
      emotion: { type: String },
    },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessage;
