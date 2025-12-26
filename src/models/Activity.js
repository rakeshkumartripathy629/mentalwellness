const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["MEDITATION", "BREATHING", "CBT", "MINDFULNESS", "QUIZ"],
      required: true,
    },
    category: {
      type: String,
      enum: ["stress", "anxiety", "sleep", "focus", "general"],
      default: "general",
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: { type: Number, default: 5 },
    content: { type: Object, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
