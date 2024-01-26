import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const videoFormat = pgEnum("videoFormat", [
  "youtube",
  "tiktok",
  "instagram",
  "linkedin",
  "facebook",
])

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 256 }),
  createdAt: timestamp("created_at").$default(() => new Date()),
  updatedAt: timestamp("updated_at").$default(() => new Date()),
})

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }),
  description: text("description"),
  videoType: videoFormat("video_type"),
  creationDate: timestamp("creation_date").$default(() => new Date()),
  lastModified: timestamp("last_modified").$default(() => new Date()),
})
