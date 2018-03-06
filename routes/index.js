var express = require('express');
var router = express.Router();
var mongoUtil = require('../mongoUtil');
var db = mongoUtil.getDb();
var movies = db.collection('movies');

function addMovie (title,createdByName,createdByUser) {
	var addMovie = {
    "movieId": 3,
    "title": title,
    "createdDate": Date.now(),
    "createdByName": createdByName,
    "createdByUser": createdByUser,
    "watched": false,
    "upvotes": 1,
    /*"imdbLink": "http://www.imdb.com/title/tt0080684",*/
    "global": true,
    "globallyWatched": false
	};
	return addMovie
}

function parseCommand (commandText) {
	var commandText = commandText.split(" ");
	var movieTitle = {'command':'none','title':'none'};
	if (commandText[0]===""){
		movieTitle.command='list';
	}
	else if (commandText[0]=== 'watched'){
		movieTitle.command = 'watched';
		movieTitle.title = commandText.slice(1).join(" ");
	}
	else {
		movieTitle.command ='add';
		movieTitle.title = commandText.join(" ");
	}
	return movieTitle
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weshouldwatch', function(req, res, next) {

	var movies = db.collection('movies');

	movies.insert(req.body, function(err, result) {

    if(err) throw err;
	});
  res.status(200).send('<p>Received</p>');
});

router.post('/weshouldwatch', function(req, res, next) {
	/*parse req.body */
	var slashCommand = parseCommand(req.body.text);

	/* Add movie to db*/
	if(req.body.token === 'sDwAy9wjeZYeE7y8VwnEpa7I' && slashCommand.command ==='add'){
		
		movies.insert(addMovie(slashCommand.title,req.body.user_name,req.body.user_id),function (err,result){
			 if(err) throw err;
		})
		var response = {
		    "text": "You added a movie to watch. Great Job!",
		    "attachments": [
		        {
		            "text":`We _should_ watch ${slashCommand.title}.`
		        }
		    ]
			}
		res.status(200).send(response);
	}
	else if (req.body.token === 'sDwAy9wjeZYeE7y8VwnEpa7I' && slashCommand.command ==='list'){
		movies.find().toArray({},function(err,results){
			if(err)throw err;
			console.log(results);
		});
		var response = {
		    "text": "Here are movies we should watch. Great Job!",
		    "attachments": [
		        {
		            "text":`<ul><li>Movie1</li></ul>`
		        }
		    ]
		}
		res.status(200).send(response);
	}
	else {
		var response = {
		    "text": "Houston, we have a problem. Great Job!",
		    "attachments": [
		        {
		            "text":"Not sure we got that. There was probably an error. Hopefully Tom Hanks gets back from the moon."
		        }
		    ]
			}
		res.status(200).send(response);
	}
});

module.exports = router;
