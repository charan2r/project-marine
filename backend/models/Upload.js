const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ["image", "video"], default: "image" },
    prediction: {
      speciesId: { type: mongoose.Schema.Types.ObjectId, ref: "Species" },
      label: String,
      confidence: Number,
    },
    aiModelVersion: String,
    status: {
      type: String,
      enum: ["pending", "identified", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
