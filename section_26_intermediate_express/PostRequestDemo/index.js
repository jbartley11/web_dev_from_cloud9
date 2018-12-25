var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// root
app.get("/", function(req, res){
    res.render("home");
})

// friends
var friends = ["Tony", "Mandy", "Jose", "Chris"
    ]
    
app.get("/friends", function(req, res){
    res.render("friends", {friends:friends});
})

// add friend
app.post("/addfriend", function(req,res){
    
    var friendName = req.body.newFriend;
    friends.push(friendName);
    console.log(friendName);
    res.redirect("/friends");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});