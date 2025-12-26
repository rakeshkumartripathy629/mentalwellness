const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "Stress Check"
    description: String,
    category: {
      type: String,
      enum: ["stress", "anxiety", "sleep", "general"],
      default: "general",
    },
    questions: [
      {
        questionText: String,
        options: [
          {
            label: String,
            value: Number, // score
          },
        ],
      },
    ],
    resultRanges: [
      {
        minScore: Number,
        maxScore: Number,
        label: String, // "Low", "Moderate", "High"
        description: String, // explanation
      },
    ],
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);
module.exports = Assessment;
