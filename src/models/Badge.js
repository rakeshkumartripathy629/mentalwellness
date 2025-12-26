const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // "STREAK_7"
    name: { type: String, required: true }, // "7 Day Streak"
    description: String,
    icon: String, // icon name/path
  },
  { timestamps: true }
);

const Badge = mongoose.model("Badge", badgeSchema);
module.exports = Badge;
