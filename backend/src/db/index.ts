import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "src/config";

const { Pool } = pkg;

const pool: pkg.Pool = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
});

pool.on("connect", () => {
  console.log("Connected to Postgres!");
});

pool.on("release", () => {
  console.log("Released from Postgres!");
});

const db = drizzle(pool, { logger: true });

export default db;
