const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    profileId: String,
    title: String,
    comments: String,
    posted: Date,
    likes: Array
});
module.exports = mongoose.model("post", PostSchema);