var MongoClient = require( 'mongodb' ).MongoClient;
console.log(process.env);
var _db;
let uri = process.env.MONGODB_URI;
console.log(uri);

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