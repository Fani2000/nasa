// const {
//   launches,
//   addNewLaunch,
//   deleteLaunch,
// } = require("../../models/launches.model");
const LaunchModel = require("../../models/launches.model");
const CustomerModel = require("../../models/customers.model");

const DEFAULT_PAGE_LIMIT = 0;

const getAllLaunches = async (req, res) => {
  try {
    const queryParams = req.query;

    const query = LaunchModel.find({}, { _id: 0, __v: 0 });

    // SORT
    query.sort({ flightNumber: -1 });

    // PAGINATION
    const page = Math.abs(queryParams.page) || 1;
    const limit = Math.abs(queryParams.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    const launches = await query.populate("customers");

    return res.status(200).json(launches);
  } catch (error) {
    return new Error("Failed to Get all Launches", 404);
  }
};

const httpPostNewLaunch = async (req, res) => {
  const body = req.body;

  // const customer = await CustomerModel.updateOne({name: "Fani Exploration ORG"}, {name: "Fani Exploration ORG"}, {upsert: true})
  const customer1 = await CustomerModel.create({ name: "Fani Keorapetse" });
  const customer2 = await CustomerModel.create({
    name: "Fani Exploration ORG",
  });

  const launch = {
    ...body,
    upcoming: true,
    success: true,
    customers: [customer2, customer1],
    flightNumber: Number((Math.random() * 100000).toFixed(2))
      .toString()
      .substring(3),
  };

  launch.launchDate = new Date(body.launchDate);

  // addNewLaunch(launch);
  const newLaunch = await LaunchModel.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
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
