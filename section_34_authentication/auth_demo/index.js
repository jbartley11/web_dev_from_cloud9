var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

// connect to mongo
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

var app = express();

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "king",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true})); // use anytime you need to get data from form

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES ----------------------------------------


app.get("/", function(req, res) {
    res.render("home");
});

// middleware isLoggedIn function confirms user is logged in
// next refers to function located after middleware
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

// login routes
app.get("/login", function(req, res){
    res.render("login");
});

// middleware - code runs before final callback, can have multiple middlewares
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

// logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started...");
});
