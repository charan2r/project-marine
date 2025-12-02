const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    profileImageUrl: String,
    contact_number: String,
    interests: [String],

    preferences: {
      language: { type: String, default: "en" },
      emailNotifications: { type: Boolean, default: true },
    },

    role: {
      type: String,
      enum: ["user", "admin", "marine_biologist"],
      default: "user",
    },

    savedSpecies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
    savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],

    socialLinks: {
      website: String,
      facebook: String,
      twitter: String,
      linkedin: String,
    },

    uploadHistory: [
      {
        fileUrl: String,
        fileType: { type: String, enum: ["image", "video"] },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    observationStats: {
      submissions: { type: Number, default: 0 },
      approved: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
