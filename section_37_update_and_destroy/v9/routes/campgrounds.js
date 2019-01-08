// use express router
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");

// campgrounds
router.get('/', function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campData:allCampgrounds});
        }
    });
});

// campgrounds form page
router.get('/new', isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// campgrounds post
router.post('/', isLoggedIn, function(req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.description;
    var author = {id: req.user._id,
                  username: req.user.username
    };
    var newCampground = {name: name, image:url, description:desc, author:author};
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
router.get("/:id", function(req, res){
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

// edit campground route
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("error");
        } else {
            // console.log(camp);
            res.render("campgrounds/edit", {camp:camp});
        }
    });
});

// update campground route
router.put("/:id", function(req, res) {
    // find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect to show page
});

// destroy
router.delete('/:id', function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });

});

// isLoggedIn middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;