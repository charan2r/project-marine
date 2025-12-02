const speciesSchema = new mongoose.Schema(
  {
    commonName: { type: String, required: true },
    scientificName: String,
    description: String,

    images: [String],
    videos: [String],

    habitat: String,
    ecosystem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ecosystem",
    },

    threats: String,

    conservationStatus: {
      type: String,
      enum: [
        "Least Concern",
        "Vulnerable",
        "Endangered",
        "Critically Endangered",
        "Extinct in the Wild",
      ],
      default: "Least Concern",
    },

    populationStatus: {
      type: String,
      enum: ["Increasing", "Stable", "Decreasing", "Unknown"],
      default: "Unknown",
    },

    discoveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    aiConfidence: Number,
  },
  { timestamps: true }
);
