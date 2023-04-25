const express = require("express");
const app = express();

app.get("/api/v1/nasa/plannets", (req, res) => {
  return res.json({
    message: "Welcome home",
  });
});

return app;
