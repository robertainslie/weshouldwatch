var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

/*MongoDB Setup */
/*let uri = process.env.MONGODB_URI;*/
let uri = 'mongodb://heroku_vpfkjpw3:egeflukeggtbugqe6gjk1p6vns@ds153958.mlab.com:53958/heroku_vpfkjpw3'
var db;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let seedData = {
    "movieId": 3,
    "title": "Star Wars: Episode V - Empire Strikes Back",
    "createdDate": 1519966800000,
    "createdBy": "Robert Ainslie",
    "watched": false,
    "upvotes": 1,
    "imdbLink": "http://www.imdb.com/title/tt0080684",
    "global": true,
    "globallyWatched": false
}
mongodb.MongoClient.connect(uri, function(err, database) {
	const dbName = database.db('heroku_vpfkjpw3')
	if(err){
		console.log(err);
		process.exit(1);
	}
	console.log("Database connection ready");
	const movies = dbName.collection('movies');

});

movies.insert(seedData, function(err, result) {

    if(err) throw err;
});

module.exports = app;



