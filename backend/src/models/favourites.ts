import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { user } from "./user";
import { property } from "./property";
import { timestamp } from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";

export const favourites = pgTable(
  "favourites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    propertyId: uuid("property_id")
      .references(() => property.id, { onDelete: "cascade" })
      .notNull(),
    favouritedAt: timestamp("favourited_at").defaultNow(),
  },
  (table) => [unique().on(table.userId, table.propertyId)],
);
