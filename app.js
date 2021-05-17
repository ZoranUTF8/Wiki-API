// RESTful API
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// Variables
const app = express();
//Methods
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MONGODB
mongoose.connect('mongodb://localhost:27017/wikiApiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "ERROR: No name inserted!"]
  },
  content: {
    type: String,
    required: [true, "ERROR: No content inserted!"]
  }
});
//Mongoose model
const Article = mongoose.model(
  "Article", // This is the name of the colletion, mongoose changes it to plural
  articleSchema
);
// END OF MONGODB  SET UP

// ROUTES

// CHAINED ROUTE HANDLER
//requests targeting all items
app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send("ERROR: " + err);
      }
    });
  })
  .post(function(req, res) {

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Article added.")
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {

    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("All articles deleted.")
      } else {
        res.send(err);
      }
    });
  });
//request for a single a specific item using route parametres
app.route("/articles/:specificArticleTitle")
  .get(function(req, res) {

    Article.findOne({
      title: req.params.specificArticleTitle
    }, function(err, result) {
      if (result) {
        res.send("FOUND MATCH: "+result)
        console.log("FOUND MATCH");
      } else {
        res.send("NO MATCH: "+err)
        console.log("ERROR " + err);
      }
    })
  })


// ------------------------

app.listen(3000, function() {
  console.log("Server running on 3000");
});
