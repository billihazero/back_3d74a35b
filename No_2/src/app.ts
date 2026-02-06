import express from "express";
import "dotenv/config";
import logger from "@config/logger";
import { responseHandler } from "@middleware/responseHandler";
import errorHandler from "@middleware/errorHandler";
import router from "@routes/index";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(responseHandler);

app.use("api", router);
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    logger.info(`${PORT}번 포트에서 서버 시작`);
  } catch (error) {
    console.error("error");
  }
});
