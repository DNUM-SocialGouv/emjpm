const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressPinoLogger = require("express-pino-logger");
const rateLimit = require("express-rate-limit");

const logger = require("./utils/logger");
const Sentry = require("./utils/sentry");
const apiLog = require("./middlewares/apiLog");
const errorHandler = require("./middlewares/error-handler");
const { version } = require("./lerna.ci.json");
const authRoutes = require("./routes/api/auth");
const oauthRoutes = require("./routes/api/oauth");
const editorsRoutes = require("./routes/api/editors");
const mandolineRoutes = require("./routes/api/mandoline");
const devRoutes = require("./routes/api/dev");
const { logRequests } = require("~/config");

const corsOptions = {
  credentials: true,
  origin: true,
};
const bodyParserOptions = {
  limit: "10mb",
};

const app = express();

// TODO: rate limiter use inmemory-store.
// EMJPM uses k8s, so we must replace it by a redis or postgre table store.
const apiLimiter = rateLimit({
  max: 360,
  windowMs: 1 * 60 * 1000, // 1 minutes
});

// middlewares
if (logRequests) {
  app.use(expressPinoLogger({ logger }));
} else {
  app.use((req, res, next) => {
    req.log = res.log = logger.child({ req: req });
    next();
  });
}

app.use(cors(corsOptions));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const oauthServer = require("./oauth/server.js");

// routes
app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);

app.use(
  "/api/editors",
  [apiLimiter, apiLog, oauthServer.authenticate()],
  editorsRoutes
);

app.use(
  "/api/mandoline",
  [apiLimiter, oauthServer.authenticate()],
  mandolineRoutes
);

app.use("/api/dev", [apiLimiter], devRoutes);

app.use(
  "/hasura/actions",
  [passport.authenticate("hasura-webhook-header-secret")],
  require("./routes/hasura-actions/hasura-actions.routes.js")
);

app.use(
  "/hasura/triggers",
  [passport.authenticate("hasura-webhook-header-secret")],
  require("./routes/hasura-triggers/hasura-triggers.routes.js")
);

app.get("/", function (req, res) {
  res.json({
    NODE_ENV: process.env.NODE_ENV || "development",
    title: "API eMJPM",
    version: version,
  });
});

// error handler
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  logger.error("unhandledRejection", error.message);
  Sentry.captureException(error);
});

process.on("uncaughtException", async (error) => {
  logger.error("uncaughtException", error.message);
  Sentry.captureException(error);
  process.exit(1);
});

module.exports = app;
