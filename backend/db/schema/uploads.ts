import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const uploads = pgTable("uploads", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 10 }).notNull(), // image | video

  // AI Prediction (single result)
  prediction: jsonb("prediction").$type<{
    label: string;
    confidence: number;
    speciesId?: string;
    modelVersion: string;
  }>(),

  // For video frame analysis
  videoFrames: jsonb("video_frames").$type<
    {
      timestamp: number;
      label: string;
      confidence: number;
      speciesId?: string;
    }[]
  >(),

  status: varchar("status", { length: 20 }).default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
});
