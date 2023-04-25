const launches = [];

const lauch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  lauchDate: new Date("December 27, 2024"),
  destination: "Kepler-442 b",
  customers: ["NASA", "FANI EXPLORATION ORG"],
  upcoming: true,
  success: true,
};

// launches.set(lauch.flightNumber, lauch);
launches.push(lauch);

module.exports = {
  launches,
};
