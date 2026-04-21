import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const ecosystems = pgTable("ecosystems", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),

  threats: text("threats").array(),

  imageUrl: text("image_url"),

  createdAt: timestamp("created_at").defaultNow(),
});
