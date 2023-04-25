const cors = require("cors");
const path = require("path");
const fs = require("fs");

const express = require("express");
const morgan = require("morgan");

const url = "http://localhost:3000";

const planetsRouter = require("./routes/plannets/plannets.router");
const launchesRouter = require("./routes/launches/launches.router");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log")
);

const app = express();

app.use(
  cors({
    origin: url,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined", { stream: accessLogStream, immediate: true }));

app.use("/api/v1/", planetsRouter);
app.use("/api/v1/", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

module.exports = app;
