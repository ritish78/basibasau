import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { POSRGRES_DATA_URL } from "src/config";

const { Pool } = pkg;

const pool: pkg.Pool = new Pool({
  connectionString: POSRGRES_DATA_URL,
});

pool.on("connect", () => {
  console.log("Connected to Postgres!");
});

pool.on("release", () => {
  console.log("Released from Postgres!");
});

const db = drizzle(pool, { logger: true });

export default db;
