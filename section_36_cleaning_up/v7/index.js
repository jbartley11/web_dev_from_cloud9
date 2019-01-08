// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");

// var Campground = require("./models/campground");
// var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");

// import routes
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");

// seed db
// seedDB();

// app
var app = express();

// set up passport
app.use(require("express-session")({
    secret: "kingking",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass object into every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// set to use ejs
app.set("view engine", "ejs");

// use public folder
app.use(express.static(__dirname + "/public"));

// connect to mongo db
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

// tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// use routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// set up listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("app has started");
});