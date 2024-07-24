import express from "express";
import db from "../db.js";
import { dbLogger, logger } from "../config/logConfig.js";
import logRequestBody from "../midllewares/requestLoger.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  addRequestToQueue,
  checkConnect,
  getAllRequests,
} from "../controllers/queueControllers.js";

const queueRouter = express.Router();
queueRouter.use(logRequestBody);
// Маршрут для обробки GET запитів

queueRouter.get("/connect", ctrlWrapper(checkConnect));

// Маршрут для обробки POST запитів (вставка даних)
queueRouter.post("/req-add", ctrlWrapper(addRequestToQueue));

// Маршрут для обробки GET запитів (отримання даних)
queueRouter.get("/get-all", ctrlWrapper(getAllRequests));

export default queueRouter;
