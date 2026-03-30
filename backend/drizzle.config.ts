import { defineConfig } from "drizzle-kit";
import { POSRGRES_DATA_URL } from "src/config";

export default defineConfig({
  schema: "./src/models/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: POSRGRES_DATA_URL,
  },
  strict: true,
  verbose: true,
});
