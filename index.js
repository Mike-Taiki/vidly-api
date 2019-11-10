const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app); // this returns a function, so we pass app as an argument
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const transports = {
  console: new winston.transports.Console({ level: "info" }),
  file: new winston.transports.File({ filename: "logfile.log", level: "info" })
};

const logger = winston.createLogger({
  transports: [transports.console, transports.file]
});

const port = process.env.PORT || 3000;
const db = config.get("db");
const { message } = logger.info(`Connected to ${db}...`);
const server = app.listen(port, () => message);

module.exports = server;
