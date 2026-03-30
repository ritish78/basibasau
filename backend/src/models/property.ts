import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";
import { varchar } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const property = pgTable("property", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id").references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  sale: boolean("on_sale").notNull().default(true),
  address: text("address").notNull(),
  price: varchar("price", { length: 15 }).notNull(),
  imageUrl: text("image_url").array(),
  likes: integer("likes").default(0).notNull(),
  views: integer("views").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Property = InferSelectModel<typeof property>;
