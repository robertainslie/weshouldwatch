var express = require('express');
var router = express.Router();
var mongoUtil = require('../mongoUtil');
var db = mongoUtil.getDb();

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


module.exports = router;
