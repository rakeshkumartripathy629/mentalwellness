const mongoose = require("mongoose");

const featureUsageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    featureName: { type: String, required: true }, // "AI_CHAT", "MOOD_LOG", "JOURNAL"
    count: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

featureUsageSchema.index({ user: 1, featureName: 1 }, { unique: true });

const FeatureUsage = mongoose.model("FeatureUsage", featureUsageSchema);
module.exports = FeatureUsage;
