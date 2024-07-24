import { dbLogger, logger } from "../config/logConfig.js";

export const checkConnect = (_, res) => {
  res.json({ message: "Connect success" });
  logger.info("Connection was checked");
};

// контролер для довання запитів в БД
export const addRequestToQueue = (req, res) => {
  const { url, body } = req.body;
  const bodyString = JSON.stringify(body);
  const sql = "INSERT INTO requests (url, body) VALUES (?, ?)";

  dbLogger.info(sql);

  db.run(sql, [url, bodyString], function (err) {
    if (err) {
      logger.error(err.message);
      return res.status(400).json({ error: err.message });
    }
    logger.info(`Запит успішно додано з ID: ${this.lastID}`);
    res.json({
      message: "Request successfully added",
      requestId: this.lastID,
    });
  });
};

// котролер для отримання всіх запитів
export const getAllRequests = async (req, res) => {
  const sql = "SELECT * FROM requests";

  dbLogger.info(sql);

  db.all(sql, [], (err, rows) => {
    if (err) {
      logger.error(err.message);
      return res.status(400).json({ error: err.message });
    }
    res.json({
      message: "Requests retrieved successfully",
      data: rows,
    });
  });
};
