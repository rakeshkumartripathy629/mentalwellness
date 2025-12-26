const mongoose = require("mongoose");

const therapistProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String },
    specialties: [{ type: String }], // ["anxiety","stress","relationships"]
    languages: [{ type: String, default: ["en"] }],
    pricePerSession: { type: Number, default: 1000 }, // in INR or whatever
    currency: { type: String, default: "INR" },
    yearsOfExperience: { type: Number, default: 0 },
    onlineStatus: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "OFFLINE",
    },
    isActive: { type: Boolean, default: true },

    // simple availability: days of week + time range
    availability: [
      {
        dayOfWeek: { type: Number, min: 0, max: 6 }, // 0 = Sunday
        startTime: String, // "09:00"
        endTime: String, // "18:00"
      },
    ],
  },
  { timestamps: true }
);

const TherapistProfile = mongoose.model(
  "TherapistProfile",
  therapistProfileSchema
);
module.exports = TherapistProfile;
