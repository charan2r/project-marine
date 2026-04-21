import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { species } from "./species";

export const observations = pgTable("observations", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),
  speciesId: uuid("species_id").references(() => species.id),

  mediaUrl: text("media_url").notNull(),
  mediaType: varchar("media_type", { length: 10 }), // image | video

  location: jsonb("location").$type<{
    lat: number;
    lng: number;
    placeName?: string;
  }>(),

  aiPrediction: jsonb("ai_prediction").$type<{
    label: string;
    confidence: number;
    modelVersion: string;
  }>(),

  createdAt: timestamp("created_at").defaultNow(),
});
