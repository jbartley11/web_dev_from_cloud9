var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

// import models
var Post = require("./models/post");
var User = require("./models/user");

// create user
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Bob"
// });

// add post without linking
// Post.create({
//     title: "how to cook",
//     content: "get a pan"
// }, function(err, post){
//     console.log(post);
// });

// add post and link to user
Post.create({
    title: "how to cook pt 4",
    content: "use some spices"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, user){
        if (err) {
            console.log(err);
        } else {
            user.posts.push(post);
            user.save(function(err, user){
                if (err) {
                    console.log(err);
                } else {
                    console.log(user);
                }
            });
        }
    });
    console.log(post);
});

// find user and find all posts
// populate method will find all posts and add them to user object
// exec method calls the  query
// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })