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
  try {
    const res = await fetch(API_URL + "/launches", {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    const res = await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (e) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
