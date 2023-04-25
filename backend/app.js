const express = require("express");
const cors = require("cors");

const planetsRouter = require("./routes/plannets/plannets.router");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/", planetsRouter);

module.exports = app;
