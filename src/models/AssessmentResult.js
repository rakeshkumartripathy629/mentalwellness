const mongoose = require("mongoose");

const assessmentResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    score: { type: Number, required: true },
    label: { type: String },
    details: { type: String },
  },
  { timestamps: true }
);

const AssessmentResult = mongoose.model(
  "AssessmentResult",
  assessmentResultSchema
);
module.exports = AssessmentResult;
