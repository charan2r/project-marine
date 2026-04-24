const {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  pgEnum,
} = require("drizzle-orm/pg-core");

const userRoleEnum = pgEnum("user_role", [
  "user",
  "admin",
  "researcher",
  "marine_biologist",
]);

const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  profileImageUrl: text("profile_image_url"),
  bio: text("bio"),
  profession: varchar("profession", { length: 100 }),
  contactNumber: varchar("contact_number", { length: 20 }),

  interests: text("interests").array(),

  preferences: jsonb("preferences"),

  role: userRoleEnum("role").default("user"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

module.exports = { users, userRoleEnum };
