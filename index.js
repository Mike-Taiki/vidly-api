require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const login = require("./routes/login");
const express = require("express");
const app = express();

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly-api",
    useUnifiedTopology: true
  })
);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
