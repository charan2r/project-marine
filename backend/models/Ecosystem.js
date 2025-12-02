const mongoose = require("mongoose");

const ecosystemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    threats: [String],
    imageUrl: String,

    species: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ecosystem", ecosystemSchema);
