const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    location: String,
    interests: String,
    email: String,
    password: String
});
module.exports = mongoose.model("profile", ProfileSchema);
