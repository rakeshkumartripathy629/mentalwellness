const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, min: 1, max: 10, required: true },
    emotion: {
      type: String,
      enum: [
        "anxious",
        "sad",
        "tired",
        "neutral",
        "happy",
        "excited",
        "angry",
        "stressed",
      ],
      default: "neutral",
    },
    note: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);
module.exports = MoodEntry;
