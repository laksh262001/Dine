//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Everyone loves food. Looking at it. Smelling it. Taking pictures of it. Making it. Eating it. Posting it on Instagram and Pinterest. And of course, talking about it!Food is the basic human need to stay alive. Moreover, it is the need of every living organism. Therefore it is important that we should not waste food. Our world consists of different types of cultures. These cultures have varieties of dishes of food in them.Thus, all the dishes have different taste. Furthermore, our nature provides us a variety of food. From fruits to vegetables, from Dairy food to seafood everything is available. Different countries have their own specialty of dishes.";
const aboutContent = "'A recipe has no soul. You, as the cook, must bring the soul to the recipe'.– Thomas Keller. This page is speacially designed for food lovers and to share their best receipes." ;

const contactContent = "Email-Id: Enter your mail";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://username:<password>1@cluster0.dacwtrf.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
 };
 const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});




// app.post("/contact", function(req, res){
//   const contact = {
//     names: req.body.Name,
//     countries: req.body.countryBody,
//     comments: req.body.commentBody
//   };

//   contacts.push(contact);
//   res.redirect("/contact");
// });

// app.get("/contactName", function(req, res){
//   const requestTitle =_.lowerCase(req.params.contactName);

//   contacts.forEach(function(contact){
//     const storeTitle = _.lowerCase(Name);

//     if (storeTitle === requestTitle){
//       res.render("contact", {
//         names:contact.names,
//         countries:contact.countries,
//         comments:contact.comments
//       });
//     }
//   });
// });




app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
 const post = new Post ({
   title: req.body.postTitle,
   content: req.body.postBody
 });
  post.save(function(err){
   if (!err){
    res.redirect("/");
   }
 });

  res.redirect("/");
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });

  });
  });


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
