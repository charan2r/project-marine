const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImageUrl: String,

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    readingTime: Number,

    relatedSpecies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
    relatedProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ConservationProject" },
    ],

    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
