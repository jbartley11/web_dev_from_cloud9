var express = require("express");
var app = express();

// "/" - Hi there
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
})

var animalSounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!"
}

var error = "Sorry page not found... What are you doing with your life?";

// animal speak
app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal;
    if(animalSounds[animal]){
        res.send("The " + animal + " says '" + animalSounds[animal] + "'");
    } else {
        res.send(error);
    }
})

// repeat
app.get("/repeat/:string/:num", function(req, res){
    var string = req.params.string;
    var num = req.params.num;
    var responseString = "";
    for(var i = 0; i < num; i++){
        responseString += string + " ";
    }
    res.send(responseString);
})

// catch all
app.get("*", function(req, res){
    res.send("catch-all");
})

// listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});
