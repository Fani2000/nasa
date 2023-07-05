const cors = require("cors");
const path = require("path");
const fs = require("fs");

const express = require("express");
const morgan = require("morgan");

const url = "http://localhost:3000";

const apiRouter = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: url,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

app.use("/api/v1/", apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

module.exports = app;
