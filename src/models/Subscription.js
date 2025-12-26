const mongoose = require("mongoose");
const { SUBSCRIPTION_PLANS } = require("../Utils/constants");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: {
      type: String,
      enum: SUBSCRIPTION_PLANS,
      default: "FREE",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
      default: "ACTIVE",
    },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
