import Queue from "bull";
import axios from "axios";
import db from "./db.js";
import { successLogger, errorLogger, dbLogger } from "./logger.js";

// Створення черги
const requestQueue = new Queue("requestQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

// Обробник завдань
requestQueue.process(async (job, done) => {
  const { id, url, body } = job.data;

  try {
    const response = await axios.post(url, JSON.parse(body));
    const responseBody = JSON.stringify(response.data);
    db.run(
      `UPDATE requests SET response = ?, status = 'completed' WHERE id = ?`,
      [responseBody, id],
      (err) => {
        if (err) {
          errorLogger.error(`Помилка при оновленні запиту: ${err.message}`);
          return done(new Error(err.message));
        }
        successLogger.info(`Запит з ID ${id} успішно виконано`);
        done();
      }
    );
  } catch (error) {
    errorLogger.error(
      `Помилка при виконанні запиту з ID ${id}: ${error.message}`
    );
    db.run(
      `UPDATE requests SET status = 'failed' WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          errorLogger.error(
            `Помилка при оновленні статусу запиту: ${err.message}`
          );
          return done(new Error(err.message));
        }
        done(new Error(error.message));
      }
    );
  }
});

export default requestQueue;
