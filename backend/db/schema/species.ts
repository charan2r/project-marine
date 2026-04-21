import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const species = pgTable("species", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),
  scientificName: varchar("scientific_name", { length: 200 }),
  description: text("description"),

  habitat: text("habitat"),
  conservationStatus: varchar("conservation_status", { length: 50 }),

  verified: boolean("verified").default(false),

  discoveredBy: uuid("discovered_by").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});
