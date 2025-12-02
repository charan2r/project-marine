const conservationProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    projectType: {
      type: String,
      enum: ["Cleanup", "Research", "Restoration", "Awareness", "Monitoring"],
      default: "Research",
    },

    organization: String,

    location: {
      country: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    startDate: Date,
    endDate: Date,

    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Paused"],
      default: "Ongoing",
    },

    fundingGoal: Number,
    amountRaised: { type: Number, default: 0 },

    gallery: [String],

    progressUpdates: [
      {
        title: String,
        description: String,
        mediaUrl: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
