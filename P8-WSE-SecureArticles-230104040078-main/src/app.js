const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinohttp = require("pino-http");

const logger = require("./utils/logger");
const correlationId = require("./middlewares/correlationId.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const { generalLimiter } = require("./middlewares/rateLimit.middleware");

const systemRoutes = require("./routes/system.routes");
const articlesRoutes = require("./routes/articles.routes");
const authRoutes = require("./routes/auth.routes");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const openapiSpec = YAML.load("./src/docs/openapi.yaml");

const app = express();

// ======== Core parsers ========
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ======== Security Hardening ========
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-correlation-id"],
  })
);

app.use(helmet());
app.use(generalLimiter);

// ======== Observability ========
app.use(correlationId);

app.use(
  pinohttp({
    logger,
    customProps: (req) => ({
      cid: req.correlationId,
      userId: req.user?.id, // terisi setelah JWT aktif
    }),
  })
);

// ======== Routes ========
app.use(systemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);

// ======== API Docs ========
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

// ======== Not Found & Error ========
app.use(notFound);
app.use(errorHandler);

module.exports = app;
