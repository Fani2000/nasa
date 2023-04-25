const express = require("express");
const { getAllLaunches, httpPostNewLaunch, httpDeleteLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter
  .get("/launches", getAllLaunches)
  .post("/launches", httpPostNewLaunch)
  .delete("/launches/:id", httpDeleteLaunch);

module.exports = launchesRouter;
