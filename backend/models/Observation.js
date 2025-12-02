const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    speciesId: { type: mongoose.Schema.Types.ObjectId, ref: "Species" },

    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },

    location: {
      name: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    notes: String,

    aiPrediction: {
      label: String,
      speciesId: { type: mongoose.Schema.Types.ObjectId, ref: "Species" },
      confidence: Number,
      modelVersion: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Observation", observationSchema);
