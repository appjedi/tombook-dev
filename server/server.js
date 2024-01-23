const port = process.env.port || 8080; // port update
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session');
const path = require("path");
const Profile = require('./model/Profile');
const Post = require('./model/Post');
const app = express();
app.use(session({ secret: 'XASDASDA' }));

const cors = require("cors");
app.use(express.json());
app.use(cors());

const GC_RELEASE = "2024-01-18";
//const MongoURL = "mongodb://localhost:27017/tom";
const MongoURL = "mongodb+srv://Admin:TomBook2024@cluster0.xtms7hy.mongodb.net/"
mongoose.connect(MongoURL);
console.log("MongoURL", MongoURL)
app.get("/release", (req, res) => {
  ssn = req.session;
  res.send(GC_RELEASE);
});
app.post("/profile", (req, res) => {
  const data = req.body;
  console.log(data);
  Profile.create(data);
  res.send({ status: 1, message: "Profile Created" });
})
app.get("/profiles", async (req, res) => {
  const data = await Profile.find({});
  console.log(data);

  res.send(data);
});
app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Profile.findById(id);
  console.log(data);

  res.send(data);
});
app.post("/login", async (req, res) => {
  const data = { email: req.body.email, password: req.body.password }
  console.log("login", data);
  const users = await Profile.find({ email: data.email });
  console.log(users);
  if (users != null && users.length > 0 && users[0].password === data.password) {
    const user = { id: users[0]._id, lastName: users[0].lastName, firstName: users[0].lastName, email: users[0].email }
    ssn = req.session;
    ssn.user = user;
    res.send({ user: user, status: 1, message: "user authenticated" });
  } else {
    res.send({ status: -1, message: "user not authenticated" });
  }
})
app.get("/user", (req, res) => {
  ssn = req.session;
  console.log(ssn.user);
  res.send(ssn.user);
})

app.post("/post", (req, res) => {
  const data = req.body;
  console.log(data);
  Post.create(data);
  res.send({ status: 1, message: "Profile Created" });
});
app.get("/posts", async (req, res) => {
  const data = await Post.find({});
  console.log(data);

  res.send(data);
});
app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Post.findById(id);
  console.log(data);

  res.send(data);
});
app.use(express.static("./src/build"));
app.get("*", (req, res) => {
  res.send(__dirname, "dir", "build", "index.html");
})
app.listen(port, () => {
  console.log("listening on port:", port);
});




