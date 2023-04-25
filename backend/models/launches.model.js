let launches = [];

const lauch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("2030/12/27"),
  target: "Kepler-442 b",
  customers: ["NASA", "FANI EXPLORATION ORG"],
  upcoming: true,
  success: true,
};

// launches.set(lauch.flightNumber, lauch);
launches.push(lauch);

const addNewLaunch = (launch) => {
  launches.push(launch);
};

const deleteLaunch = (id) => {
  const isExists = launches.find(
    (item) => item.flightNumber === Number(id)
  );

  if (isExists) {
    launches = launches.filter((item) => item.flightNumber === Number(id));
    return true;
  } else return false;
};

module.exports = {
  launches,
  addNewLaunch,
  deleteLaunch,
};
