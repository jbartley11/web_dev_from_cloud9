// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds.js");


// seed db
console.log(typeof(seedDB));
seedDB();

// app
var app = express();

// set to use ejs
app.set("view engine", "ejs");

// connect to mongo db
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true })

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

// campground data
var campData = [
        {name: "Creek Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"},
        {name: "Jones Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"},
        {name: "Short Creek Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"},
        {name: "Top Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"},
        {name: "Bottom Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"},
        {name: "Espy Camp", image: "https://image.shutterstock.com/z/stock-photo-lake-of-two-rivers-campground-algonquin-national-park-beautiful-natural-forest-landscape-canada-745284697.jpg"}
    ];

// landing page
app.get("/", function(req, res){
    res.render("home");
})

// campgrounds
app.get('/campgrounds', function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campData:allCampgrounds});
        }
        
    })
    
})

// campgrounds form page
app.get('/campgrounds/new', function(req, res) {
    res.render("new-campground");
})

// campgrounds post
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.description;
    var newCampground = {name: name, image:url, description:desc}
    Campground.create(newCampground, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");
        }
    })
    
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
});

// show - show more info on single campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if(err){
            console.log("error");
        }else {
            // console.log(camp);
            res.render("show", {camp:camp});
        }
    });
    // render show template with that campground
    
});

// set up listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("app has started");
})