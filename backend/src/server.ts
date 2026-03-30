import express, { Request, Response, NextFunction } from "express";
import authRoute from "./routes/auth";

import session from "express-session";
import redisClient from "./db/redis";
import { REDIS_SECRET } from "./config";
import { RedisStore } from "connect-redis";
import { AppError } from "./utils/error";
redisClient.connect();

const app = express();

app.use(express.json());

const redisStore = new RedisStore({ client: redisClient });

declare module "express-session" {
  interface SessionData {
    userId: string;
    email: string;
  }
}

app.use(
  session({
    store: redisStore,
    // secret: REDIS_SECRET,
    secret: "oskpcUHxrPthFtazirNskZDYVLpkAp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400 * 100,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

app.get("/api/v1/ping", (req, res) => {
  return res.status(200).json({ message: "Pong!" });
});

app.use("/api/v1/auth", authRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  return res.status(500).send({ message: "Oops! Something occurred in the server! Please try again!" });
});

export default app;
