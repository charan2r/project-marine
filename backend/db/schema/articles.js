const {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
  jsonb,
} = require("drizzle-orm/pg-core");
const { users } = require("./users");

const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),

  coverImageUrl: text("cover_image_url"),

  authorId: uuid("author_id").references(() => users.id),

  tags: text("tags").array(),

  readingTime: integer("reading_time"),

  references: text("references").array(),

  relatedSpecies: text("related_species").array(),
  relatedProjects: text("related_projects").array(),

  published: varchar("published", { length: 10 }).default("false"),

  views: integer("views").default(0),

  likes: text("likes").array(),

  comments: jsonb("comments"),

  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { articles };
