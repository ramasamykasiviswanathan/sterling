const { Client } = require("pg");

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
client.query(
  "SELECT * FROM information_schema.tables",
  (err, res) => (err && console.log(err.stack)) || console.log(res.rows[0])
);
