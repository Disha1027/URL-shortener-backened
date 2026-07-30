const express = require("express");
const routes = require("./routes");

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).send("ROOT ROUTE IS WORKING - VERSION 2");
});

app.use("/", require("./routes"));

module.exports = app;