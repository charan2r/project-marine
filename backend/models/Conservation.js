const mongoose = require("mongoose");

const conservationProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    location: {
      country: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    imageUrl: String,
    startDate: Date,
    endDate: Date,
    fundingGoal: Number,
    amountRaised: { type: Number, default: 0 },
    contactEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ConservationProject",
  conservationProjectSchema
);
