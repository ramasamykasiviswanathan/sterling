const express = require("express");
const geoip = require("geoip-lite");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { application_name } = require("pg/lib/defaults");
const { Client } = require("pg");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, () => {
  console.log("Server started in the port ", port);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/api/:geo", (req, res) => {
  console.log(req.params.geo);
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const geoloc = geoip.pretty(ip);
  console.log("Request IP address is ", ip);
  console.log("geo location is", geoip.pretty(ip), "\n", geoip.lookup(ip));
  client.query(
    "INSERT INTO location (ipaddr, reqloc, geoloc) VALUES ($1, $2, $3) ON CONFLICT (ipaddr) DO UPDATE SET reqloc = EXCLUDED.reqloc, geoloc = EXCLUDED.geoloc",
    [ip, req.params.geo, geoloc],
    (err, res) => (err && console.log(err.stack)) || console.log(res.rows[0])
  );
  res.send("Error occurred please refresh the page!");
  client.query(
    "select * from location",
    (err, res) =>
      (err && console.log(err.stack)) ||
      res.rows.forEach((e) => {
        console.log("--", e);
      })
  );
});
