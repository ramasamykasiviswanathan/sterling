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

const client = new Client({
  host: "ec2-107-20-173-227.compute-1.amazonaws.com",
  port: 5432,
  user: "eifqdajlsekyln",
  password: "4f9f35a7231046f48755fce2857e6a5c722737fbe9ab56ca25b4fd781ba95611",
  database: "dmp09og0pfinv",
  ssl: { rejectUnauthorized: false },
});
client.connect(
  (err) => (err && console.log(err.stack)) || console.log("connected")
);

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
  client.query(
    "select * from location",
    (err, res) =>
      (err && console.log(err.stack)) ||
      res.rows.forEach((e) => {
        console.log("--", e);
      })
  );
  res.send("Error occurred please refresh the page!");
});

app.get("/statement", (req, res) => {
  client.query(
    "select * from location",
    (err, rs) => (err && console.log(err.stack)) || res.send(rs.rows)
  );
});
