var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// add methods we need to schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);