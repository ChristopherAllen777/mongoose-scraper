// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Use Routes
var routes = require("./controllers/controller.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
var PORT = process.env.PORT || 8080;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_h0s1fzwn:7irtf6vnalfs0l3i63tdflst8c@ds161493.mlab.com:61493/heroku_h0s1fzwn");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



// sets routes
app.use("/", routes);
//setup handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Listening to Port 8080
app.listen(PORT, function(){
	console.log('listening on http://localhost:' + PORT);
});