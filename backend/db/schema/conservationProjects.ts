import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const conservationProjects = pgTable("conservation_projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),

  projectType: varchar("project_type", { length: 50 }),

  organization: varchar("organization", { length: 255 }),

  location: jsonb("location").$type<{
    country: string;
    city?: string;
    lat?: number;
    lng?: number;
  }>(),

  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),

  status: varchar("status", { length: 20 }).default("ongoing"),

  fundingGoal: numeric("funding_goal"),
  amountRaised: numeric("amount_raised").default("0"),

  gallery: text("gallery").array(),

  progressUpdates: jsonb("progress_updates").$type<
    {
      title: string;
      description: string;
      mediaUrl?: string;
      createdAt: string;
    }[]
  >(),

  volunteers: text("volunteers").array(), // user IDs

  createdBy: uuid("created_by").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});
