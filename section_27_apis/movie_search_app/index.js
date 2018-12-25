// import packages
var express = require("express");
var request = require("request");

// create app
var app = express();

// set engine to ejs
app.set("view engine", "ejs");

// home page with search
app.get("/", function(req, res){
    res.render("search");
});

// results route
app.get("/results", function(req, res){
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + search;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data:data});
        }
    })
});

app.get("*", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app started");
})