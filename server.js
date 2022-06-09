const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, () => {
  console.log("Server started in the port ", port);
});

app.get("/", (req, res) => {
  console.log(JSON.stringify(req));
  res.send("Error occurred please refresh the page!");
});
