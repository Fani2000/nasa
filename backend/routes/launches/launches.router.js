const express = require("express");
const {
  getAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter
  .get("/", getAllLaunches)
  .post("/", httpPostNewLaunch)
  .delete("/:id", httpDeleteLaunch);

module.exports = launchesRouter;
