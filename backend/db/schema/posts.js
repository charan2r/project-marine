const {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} = require("drizzle-orm/pg-core");
const { users } = require("./users");

const forumPosts = pgTable("forum_posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),

  tags: text("tags").array(),

  comments: jsonb("comments"),

  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { forumPosts };
