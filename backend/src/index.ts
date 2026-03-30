import { EXPRESS_SERVER_PORT } from "./config";
import app from "./server";

app.listen(EXPRESS_SERVER_PORT, () => {
  console.log("Express server running on port:", EXPRESS_SERVER_PORT);
});
