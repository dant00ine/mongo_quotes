//declare requirements
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//setup database connection
mongoose.connect('mongodb://localhost/quoting_dojo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
});

//declare schema for inserting new quote
var quoteSchema = new mongoose.Schema({
	name: String,
	content: String,
	time: Date
});
//initialize new documents as quote objects
var Quote = mongoose.model('Quote', quoteSchema);

//start the express app
var app = express();

//prepare for parsing of post data
app.use(bodyParser.urlencoded({extended:true}));

//set directory for static content (styling, for this case)
app.use(express.static(path.join(__dirname, './views')));

//set directory for views using ejs engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//get root directory
app.get('/', function(req, res){
	res.render('index');
});

//listen on port 8000
app.listen(8000, function(){
	console.log("listening on port 8000");
})