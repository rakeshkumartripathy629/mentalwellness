const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["stress", "anxiety", "sleep", "focus", "general"],
      default: "general",
    },
    totalDays: { type: Number, required: true },
    days: [
      {
        dayNumber: Number,
        activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      },
    ],
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);
module.exports = Program;
