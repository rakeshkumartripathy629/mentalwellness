const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    moodTag: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      default: "neutral",
    },
    aiSummary: { type: String },
  },
  { timestamps: true }
);

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);
module.exports = JournalEntry;
