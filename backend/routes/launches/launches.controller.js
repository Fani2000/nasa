const {
  launches,
  addNewLaunch,
  deleteLaunch,
} = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
  console.log(launches);
  return res.status(200).json(launches);
};

const httpPostNewLaunch = (req, res) => {
  const body = req.body;

  const launch = {
    ...body,
    upcoming: true,
    success: true,
    customers: ["Fani Exploration ORG"],
    flightNumber: launches[launches.length - 1].flightNumber + 1,
  };

  launch.launchDate = new Date(body.launchDate);

  addNewLaunch(launch);

  return res.status(200).json(launch);
};

const httpDeleteLaunch = (req, res) => {
  const launchId = req.params.id;

  const abortedLaunch = deleteLaunch(launchId);

  if (!abortedLaunch) {
    console.log("Item not found");
    return res.status(400).json({
      error: "Launch not found",
    });
  }

  return res.status(200);
};

module.exports = {
  getAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
};
