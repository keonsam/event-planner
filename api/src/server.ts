import app from "./app";
import config from "./config";
import { initDb } from "./db/dbConnection";
import logger from "./middleware/logger";

const { port } = config;

initDb().then(() => {
  app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
  });
});
