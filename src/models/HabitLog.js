const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

habitLogSchema.index({ habit: 1, date: 1 }, { unique: true });

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
module.exports = HabitLog;
