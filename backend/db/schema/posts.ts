import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const forumPosts = pgTable("forum_posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),

  tags: text("tags").array(),

  comments: jsonb("comments").$type<
    {
      userId: string;
      text: string;
      createdAt: string;
    }[]
  >(),

  createdAt: timestamp("created_at").defaultNow(),
});
