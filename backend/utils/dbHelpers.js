const launchesModel = require("../models/launches.model");

const findLaunch = async (filter) => {
  return await launchesModel.findOne(filter);
};

const existsLaunchWithId = async (launchId) => {
  return await findLaunch({
    flightNumber: launchId,
  });
};

module.exports = {
  findLaunch,
  existsLaunchWithId,
};
