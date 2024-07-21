import winston from "winston";
import "dotenv/config";

const LEVEL = process.env.LOG_LEVEL || "info";

// Налаштування форматів логування
const { combine, timestamp, printf } = winston.format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Створення логера з транспортуванням в файли
export const logger = winston.createLogger({
  level: LEVEL,
  format: combine(timestamp(), myFormat),
  transports: [
    // Логування всіх повідомлень в service.log
    new winston.transports.File({ filename: "./logs/service.log" }),
    // Логування повідомлень з рівнем error і вище в error.log
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

export const dbLogger = winston.createLogger({
  level: LEVEL,
  format: combine(timestamp(), myFormat),
  transports: [
    // Логування запитів до БД в service.log
    new winston.transports.File({ filename: "./logs/db.log" }),
  ],
});

export const requestLogger = winston.createLogger({
  level: LEVEL,
  format: combine(timestamp(), myFormat),
  transports: [
    // Логування запитів до БД в service.log
    new winston.transports.File({ filename: "./logs/request.log" }),
  ],
});
