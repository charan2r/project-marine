const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    scientificName: String,
    description: String,
    imageUrl: String,
    habitat: String,
    conservationStatus: {
      type: String,
      enum: [
        "Least Concern",
        "Vulnerable",
        "Endangered",
        "Critically Endangered",
      ],
      default: "Least Concern",
    },
    discoveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Species", speciesSchema);
