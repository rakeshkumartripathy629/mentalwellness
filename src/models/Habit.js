const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, // e.g. "10 min walk"
    description: String,
    frequency: {
      type: String,
      enum: ["DAILY", "WEEKLY"],
      default: "DAILY",
    },
    reminderTime: String, // "21:30" – optional
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
