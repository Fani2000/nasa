const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./data/planets_project_code");

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await loadPlanetsData();

  const server = http.createServer(app);

  server.listen(PORT, () => console.log(`Listerning on port ${PORT}`));
};

startServer();
