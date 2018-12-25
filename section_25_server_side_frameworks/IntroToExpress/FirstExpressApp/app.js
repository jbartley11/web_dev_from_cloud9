var express = require("express");
var app = express();

// "/" - Hi there
app.get("/", function(req, res){
    res.send("Hi there!");
})
// "/bye" - goodbye
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})
// "/dog" - meow
app.get("/dog", function(req, res){
    console.log("Someone requested dog!");
    res.send("Meow!");
})

//subreddits
app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("welcome to " + subreddit);
});

//comments
app.get("/r/:subsubredditName/comments/:id/:title/", function(req,res){
    var subreddit = req.params.subredditName;
    res.send(subreddit +" comments page");
})

// catch all
app.get("*", function(req, res){
    res.send("catch-all");
})
// tell it to listen, give port
// cloud9 needs port, ip
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});