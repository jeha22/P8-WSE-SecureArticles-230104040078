const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error(
    {
      err,
      cid: req.correlationId,
    },
    "Unhandled error"
  );

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
