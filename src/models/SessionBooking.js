const mongoose = require("mongoose");

const sessionBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // role COACH
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, default: 50 },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    meetingLink: { type: String }, // e.g. https://meet.yourdomain.com/xyz
    notesForTherapist: { type: String },
    notesForUser: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // in case admin creates
  },
  { timestamps: true }
);

const SessionBooking = mongoose.model("SessionBooking", sessionBookingSchema);
module.exports = SessionBooking;
