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
app.get("/articles", function(req, res) {


  Article.find({}, function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send("ERROR: " + err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server running on 3000");
});
