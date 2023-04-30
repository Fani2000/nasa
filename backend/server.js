const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

const { loadPlanetsData } = require("./data/planets_project_code");
const { connect } = require("./db");

const PORT = process.env.PORT || 8000;

dotenv.config();

const startServer = async () => {
  const dbRes = await connect();
  if (!dbRes) throw new Error("Connection to the db Failed: 💣💣💣");
  await loadPlanetsData();

  const server = http.createServer(app);

  server.listen(PORT, () => console.log(`Listerning on port ${PORT}`));
};

startServer();
