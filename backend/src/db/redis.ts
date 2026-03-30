import { createClient } from "redis";
import { REDIS_URL } from "src/config";

const redisClient = createClient({ url: REDIS_URL });

redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});

export default redisClient;
