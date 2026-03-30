import express from "express";
import authRoute from "./routes/auth";

const app = express();

app.use(express.json());

app.get("/api/v1/ping", (req, res) => {
  return res.status(200).json({ message: "Pong!" });
});

app.use("/api/v1/auth", authRoute);

export default app;
