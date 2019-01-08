// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds.js");



// seed db
seedDB();

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



// create test campground into mongo
// Campground.create(
//         {name: "Short Camp",
//         image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg",
//         description: "a short camp"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(campground);
//         }
//     })



// landing page
app.get("/", function(req, res){
    res.render("home");
});

// campgrounds
app.get('/campgrounds', function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            console.log(req);
            res.render("campgrounds/index", {campData:allCampgrounds});
        }
    });
});

// campgrounds form page
app.get('/campgrounds/new', function(req, res) {
    res.render("campgrounds/new");
});

// campgrounds post
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.description;
    var newCampground = {name: name, image:url, description:desc};
    Campground.create(newCampground, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
    
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
});

// show - show more info on single campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if (err) {
            console.log("error");
        } else {
            // console.log(camp);
            res.render("campgrounds/show", {camp:camp});
        }
    });
});

// comment routes
// new comment page
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("error");
        } else {
            // console.log(camp);
            res.render("comments/new", {camp:camp});
        }
    });
});

// comment post
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    // look up campground id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    // add comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect back to campground page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
        
    });
    // create new comment
    // connect new comment to campground
    // redirect
});

// AUTH ROUTES
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    } );
});

// login routes
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local",
    {successRedirect:"/campgrounds",
    failureRedirect: "/login"
    }),
    
    function(req, res){
    
});

// LOGOUT
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// isLoggedIn middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// set up listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("app has started");
});