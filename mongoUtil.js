var MongoClient = require( 'mongodb' ).MongoClient;

var _db;
let uri = process.env.MONGODB_URI;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect(uri, function( err, db ) {
    	console.log('connecting, setting db = heroku_vpfkjpw3');
      _db = db.db('heroku_vpfkjpw3');
      console.log('db set, setting collection to movies;')
      console.log('collection set, inserting seed');

      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};