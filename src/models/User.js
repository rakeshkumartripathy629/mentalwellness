const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },

    phone: {
      type: String,
      default: null, // NOT UNIQUE
    },

    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["USER", "COACH", "ADMIN"],
      default: "USER",
    },

    preferences: {
      language: { type: String, default: "en" },
      timezone: { type: String, default: "Asia/Kolkata" },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
    },

    wellnessGoal: {
      type: String,
      enum: ["stress", "sleep", "anxiety", "focus", "self-esteem", null],
      default: null,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.password) return;
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// MATCH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
