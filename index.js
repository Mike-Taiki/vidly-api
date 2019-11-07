const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging");
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
const { message } = logger.info(`Listening on port ${port}...`);
app.listen(port, () => message);
