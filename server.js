const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const MongoClient = require("mongodb").MongoClient;
app.use(cors());

// var map = [
//   { code: "IN", value: 1000 },
//   { code: "US", value: 800 },
//   { code: "CN", value: 900 },
//   { code: "CA", value: 500 },
// ];
var db;

const uri =
  "mongodb+srv://outreach-admin:1212@outreach.gdicx.mongodb.net/<dbname>?retryWrites=true&w=majority";

const options = {
  userNewUrlParser: true,
};

MongoClient.connect(uri).then(
  (database) => {
    console.log("connected");
    db = database;
  },
  (err) => {
    console.log("Error: " + err);
  }
);

app.get("/world/:yy", (req, res) => {
  let year = req.params.yy;
  let dbo = db.db("india-commerce");
  dbo
    .collection("total_trade")
    .find({}, { projection: { _id: 0, Code: 1, [year]: 1 } })
    .toArray((err, result) => {
      res.send(result);
    });
});

app.get("/getData", (req, res) => {
  var countryData = {};
  map.forEach(function (obj) {
    countryData[obj.code] = obj.value;
  });
  console.log(req.query);
  res.send(countryData[req.query.key]);
});

app.listen(8080);

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  db.close();
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
