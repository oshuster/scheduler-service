import { requestLogger } from "../config/logConfig.js";

const logRequestBody = (req, res, next) => {
  requestLogger.info(`[REQUEST >>>] Request Body: ${JSON.stringify(req.body)}`);
  next();
};

export default logRequestBody;
