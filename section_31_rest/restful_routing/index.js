var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var sanitizer = require("express-sanitizer");

// create app
var app = express();

// tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());

// set ejs as view engine
app.set("view engine", "ejs");

// use static public folder for assets
app.use(express.static("public"));

// set up mongoose
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });

// mongo schema setup
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// add in blog data
// Blog.create({
//     title: "First Blog",
//     image: "https://pixabay.com/get/e135b0062af51c22d2524518b7444795ea76e5d004b0144590f9c77ea3e9b1_340.jpg",
//     body: "I love typing on my vintage typewriter!"
//     }, function(err, blog){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(blog);
//         }
//     })

// ROUTES

// site root
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
             res.render("index", {blogs:blogs});
        }
    });
   
});

// new blog form page
app.get("/blogs/new", function(req, res){
        res.render("new");
});

// CREATE - new blog post
app.post("/blogs", function(req, res){
    // get body and sanitize it
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, blog){
        if(err){
            console.log(err);
        } else {
            console.log(blog);
            res.redirect("/");
        }
    });
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:blog});
        }
        
    });
    
});

//edit 
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog:blog});
        }
    });
});

// UPDATE - put request to update existing blog
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
        if(err) {
            res.redirect("blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

// set app to listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started...");
});