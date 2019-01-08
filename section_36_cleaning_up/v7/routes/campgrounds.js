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
router.get('/new', function(req, res) {
    res.render("campgrounds/new");
});

// campgrounds post
router.post('/', function(req, res) {
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

module.exports = router;