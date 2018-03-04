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
    "movieId": 2,
    "title": "Star Wars: Episode IV - A New Hope",
    "createdDate": 1519966800000,
    "createdBy": "Robert Ainslie",
    "watched": false,
    "upvotes": 1,
    "imdbLink": "http://www.imdb.com/title/tt0076759/",
    "global": true,
    "globallyWatched": false
}

mongodb.MongoClient.connect(uri, function(err, db) {

  if(err){
    console.log(err);
    process.exit(1);
  }

  /*
   * Get the database from the client. Nothing is required to create a
   * new database, it is created automatically when we insert.
   */

 db = db;
 console.log("Database connection ready");

  var movies = db.collection('movies');
  console.log(movies);

   // Note that the insert method can take either an array or a dict.

  movies.insert(seedData, function(err, result) {

    if(err) throw err;

        /*
         * Finally we run a query which returns all the hits that spend 10 or
         * more weeks at number 1.
         */

          /*docs.forEach(function (doc) {
            console.log(
              'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
              ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
            );
          });*/

          // Since this is an example, we'll clean up after ourselves.
     console.log(result);    
  });
   /*database.close(function (err) {
              if(err) throw err;
            });*/

});

module.exports = app;



