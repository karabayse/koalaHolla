var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var port = process.env.PORT || 8080;
var pg = require('pg');
// setup config for the pool
var config = {
  database: 'HollaKoala',
  host: 'localhost',
  port: 5432,
  max: 5
};
// create new pool using conifg
var pool = new pg.Pool(config);
// static folder
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( {extended: true }));
// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve('public/index.html' ));
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  //assemble object to send
  // var objectToSend = {
  //   response: 'from getKoalas route'
  // }; //end objectToSend
  var allKoalas = [];
  // connect to db
  pool.connect( function(err, connection, done){
    //check for error
    if(err){
      console.log(err);
      //respond
      res.send(400);
    }
    else{
      console.log('connected!');
      // Telling the server to get a row and when it finds one it will push into our empty array.
      var resultSet = connection.query("SELECT * from koala");
      resultSet.on('row', function (row) {
        console.log('are you running?', row);
        allKoalas.push(row);
      }); // end row
// on 'end', or when the process of finding rows is done, we then call the new array.
      resultSet.on('end', function () {
        console.log('allKoalas ->', allKoalas);
        res.send( allKoalas );
        done();
      });
    } //end else
  });
  //send info back to client

});

// add koala
app.post( '/addKoala', function( req, res ){
  console.log( 'addKoala route hit' );
  //assemble object to send
  var objectToSend = {
    response: ('from addKoala route')
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});

// add koala
app.post( '/editKoala', function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from editKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
