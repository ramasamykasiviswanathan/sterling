const express = require("express");
const geoip = require("geoip-lite");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, () => {
  console.log("Server started in the port ", port);
});

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("Request IP address is ", ip);
  console.log("geo location is", geoip.lookup(ip));
  res.send("Error occurred please refresh the page!");
});
