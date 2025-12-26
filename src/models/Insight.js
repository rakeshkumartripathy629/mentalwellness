const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["WEEKLY_MOOD", "JOURNAL_SUMMARY"],
      required: true,
    },
    periodStart: Date,
    periodEnd: Date,
    text: String, // AI generated
  },
  { timestamps: true }
);

const Insight = mongoose.model("Insight", insightSchema);
module.exports = Insight;
