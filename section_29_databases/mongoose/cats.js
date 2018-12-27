var mongoose = require("mongoose");

// connect to db
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true})

// define cat schema, defines pattern of data in db
// every cat will have these values
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// cat model - object
// use capital to start
// will be used to create all cats
// has methods
// creates collection cats
var Cat = mongoose.model("Cat", catSchema);

// add new cat to mongoose model
// var newCat = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// save new cat
// use callback function to check for errors and log
// also returns object created
// newCat.save(function(err, cat){
//     if(err){
//         console.log("something went wrong");
//     } else {
//         console.log("saved cat to db");
//         console.log(cat);
//     }
// });

// another method for creating new cat
// like new and save together
Cat.create({
    name: "black White",
    age: 13,
    temperament: "hood"
}, function(err, item) { if(err){
        console.log("something went wrong");
    } else {
        console.log("saved cat to db");
        console.log(item);
    }
});

// retrieve all cats
Cat.find({}, function(err, cats){
    if(err){
        console.log("something went wrong");
        console.log(err);
    } else {
        console.log("cats:");
        console.log(cats);
    }
})