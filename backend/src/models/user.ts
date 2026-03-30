import { InferSelectModel } from "drizzle-orm";
import { varchar, timestamp, uuid, pgTable, index } from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 25 }).notNull(),
    lastName: varchar("last_name", { length: 25 }).notNull(),
    email: varchar("email", { length: 50 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("email_index").on(table.email)],
);

export type User = InferSelectModel<typeof user>;
