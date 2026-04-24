const {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} = require("drizzle-orm/pg-core");
const { users } = require("./users");

const uploads = pgTable("uploads", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 10 }).notNull(),

  prediction: jsonb("prediction"),

  videoFrames: jsonb("video_frames"),

  status: varchar("status", { length: 20 }).default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { uploads };
