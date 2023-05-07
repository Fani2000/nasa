const axios = require("axios");
const { findLaunch } = require("../utils/dbHelpers");
const launchesModel = require("./launches.model");
const customersModel = require("./customers.model");

const SPACE_X_API_URL = "https://api.spacexdata.com/v4/launches/query";

const getCustomers = async (Launch) => {
  const customers = [];
  const _customers = Launch.payloads.flatMap((payload) => payload.customers);

  for (const customer of _customers) {
    const newCustomer = await customersModel.create({
      name: customer,
    });
    customers.push(newCustomer);
  }

  return customers;
};

const populateLaunches = async () => {
  const res = await axios.post(SPACE_X_API_URL, {
    query: {},
    options: {
      // "limit": ,
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
            name: 1,
          },
        },
      ],
    },
  });

  // Mapping of the data from space X
  // flight_number, name,rocket.name, date_local, upcoming, success, res.data.docs[0].payloads[0].customers

  // console.log(res.data.docs[0].payloads[0])
  // console.log(res.data.docs[0].rocket)

  if (res.status !== 200) {
    console.log("Problem downloading launch data...💥💥💥💥💥💥💥💥💥💥");
    throw new Error("Failed to download the Space X launch data.");
  }

  const spaceXLaunches = res.data.docs;

  for (const spaceXLaunch of spaceXLaunches) {
    const _spaceXLaunch = {
      flightNumber: spaceXLaunch.flight_number,
      mission: spaceXLaunch.name,
      rocket: spaceXLaunch.rocket.name,
      launchDate: spaceXLaunch.date_local,
      upcoming: spaceXLaunch.upcoming,
      success: spaceXLaunch.success,
      customers: await getCustomers(spaceXLaunch),
    };

    // console.log(
    //   _spaceXLaunch.flightNumber,
    //   _spaceXLaunch.mission,
    //   _spaceXLaunch.success,
    //   _spaceXLaunch.upcoming
    // );
    launchesModel.create(_spaceXLaunch);
  }
};

const getSpaceXLaunches = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
  } else {
    await populateLaunches();
  }
};

module.exports = {
  getSpaceXLaunches,
};
