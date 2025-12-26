const mongoose = require("mongoose");

const sleepLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    sleepTime: String, // "23:30"
    wakeTime: String, // "06:30"
    quality: { type: Number, min: 1, max: 5 },
    note: String,
  },
  { timestamps: true }
);

sleepLogSchema.index({ user: 1, date: 1 }, { unique: true });

const SleepLog = mongoose.model("SleepLog", sleepLogSchema);
module.exports = SleepLog;
