var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// define embedded object's schema first
// POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

var Post = mongoose.model("Post", postSchema);

// USER
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema] // add this to embed posts within user
});

var User = mongoose.model("User", userSchema);


// create user for testing and add post
// User.create({name: "Jason", email:"Jason@jason.com"}, function(err, user){
//     if(err) {
//         console.log(err);
//     } else {
//         user.posts.push({title:"test post", content:"this is the best!"});
//         user.save(function(err, user){ // must save object 
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log(user);
//             }
//         });
        
//     }
// });

// find user and add post
User.findOne({name: "Jason"}, function(err, user){
    if(err) {
        console.log(err);
    } else {
        user.posts.push({title:"second post", content:"this is the second best!"});
        user.save(function(err, user){ // must save object 
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
        
    }
});

// create post for testing
// Post.create({title:"Test Post", content:"This is a test post"}, function(err, post){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });