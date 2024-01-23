const port = process.env.port || 8080; // port update
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session');
const Profile = require('./server/model/Profile');
const app = express();
const path = require("path");
app.use(session({ secret: 'XASDASDA' }));

const cors = require("cors");
app.use(express.json());
app.use(cors());

const GC_RELEASE = "2024-01-13";
//const MongoURL = "mongodb://localhost:27017/tom";
const MongoURL = "mongodb+srv://appuser:AppData2022@cluster0.aga82.mongodb.net/tombook";
mongoose.connect(MongoURL);

app.get("/release", (req, res) => {
  ssn = req.session;
  res.send(GC_RELEASE);
});
app.post("/profile", (req, res) => {
    const data = req.body;
    console.log(data);
    Profile.create(data);
    res.send({status:1, message:"Profile Created"});
})

app.use(express.static("./src/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
})
app.listen(port, () => {
  console.log("listening on port:", port);
});




