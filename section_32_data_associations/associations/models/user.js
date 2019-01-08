var mongoose = require("mongoose");

// USER
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }] // mongo objectid related to a post
});

var User = mongoose.model("User", userSchema);

module.exports = User;