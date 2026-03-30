import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const environmentVariableSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  EXPRESS_SERVER_PORT: z.string().trim().min(1),
  POSTGRES_HOST: z.string().trim().min(1),
  POSTGRES_DATABASE: z.string().trim().min(1),
  POSTGRES_USER: z.string().trim().min(1),
  POSTGRES_PASSWORD: z.string().trim().min(1),
  POSTGRES_PORT: z.number().positive().int(),
  POSTGRES_DATA_URL: z.string().trim().min(1),
});

try {
  environmentVariableSchema.parse(process.env);
} catch (error) {
  throw new Error("Please provide all environment variables!");
}

type EnvSchemaType = z.infer<typeof environmentVariableSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
