const API_URL = "http://localhost:8000/api/v1";

async function httpGetPlanets() {
  const res = await fetch(API_URL + "/planets");
  const data = await res.json();
  console.log(data);
  return data;
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const res = await fetch(API_URL + "/launches");
  const data = await res.json();
  console.log(data);
  return data.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
