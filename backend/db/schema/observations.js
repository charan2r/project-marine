const {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} = require("drizzle-orm/pg-core");
const { users } = require("./users");
const { species } = require("./species");

const observations = pgTable("observations", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),
  speciesId: uuid("species_id").references(() => species.id),

  mediaUrl: text("media_url").notNull(),
  mediaType: varchar("media_type", { length: 10 }), // image | video

  location: jsonb("location"),

  aiPrediction: jsonb("ai_prediction"),

  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { observations };
