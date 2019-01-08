// use express router
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// new comment page
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log("error");
        } else {
            res.render("comments/new", {camp:camp});
        }
    });
});

// comment post
router.post("/", isLoggedIn, function(req, res) {
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
                    // add username and id to comment then save
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    console.log(comment);
                    // add comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect back to campground page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
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