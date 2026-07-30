const express = require("express");
const routes = require("./routes");

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener Backend API is running",
    health: "/health",
    shorten: "POST /shorten",
    stats: "/:code/stats"
  });
});

app.use("/", routes);

module.exports = app;