// dependencies
var express = require("express");
var bodyParser = require("body-parser");

// app
var app = express();

// set to use ejs
app.set("view engine", "ejs");

// tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

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
    res.render("campgrounds", {campData:campData});
})

// campgrounds form page
app.get('/campgrounds/new', function(req, res) {
    res.render("new-campground");
})

// campgrounds post
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var newCampground = {name: name, image:url}
    campData.push(newCampground);
    res.redirect("/campgrounds")
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
})

// set up listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("app has started");
})