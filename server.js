
/**
 * Module dependencies.
 */
var _ = require('./public/js/underscore')._;

require.paths.unshift('vendor');
require.paths.unshift('vendor/ejs');
require.paths.unshift('vendor/node-couchdb/lib');

var express = require('express/index'),
    connect = require('connect/index'),
    
    sys     = require('sys');

var app = module.exports = express.createServer();

var couchdb = require('couchdb'), client, db;

var couch_views = require('./lib/couch_views');

var view_helpers = require('./lib/view_helpers');

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(express.logger());
    app.use(connect.bodyDecoder());
    app.use(connect.methodOverride());
    app.use(app.router);
    app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
    client = couchdb.createClient(5984, 'localhost');
    db = app.db = client.db('w4lls_test');
});

app.configure('production', function(){
   app.use(connect.errorHandler());
   client = couchdb.createClient(443, 'langalex.cloudant.com', 'langalex', process.env.CLOUDANT_PASSWORD);
   db = client.db('w4lls_production');
});

couch_views.update_views(db, _);

// Routes

app.put('/update_views', function(req, res) {
  couch_views.update_views(db, _);
  res.send(201);
});

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/apartments', function(req, res) {
  db.saveDoc(null, req.body);
  res.send(201);
});


function send_error(res, er) {
  res.send(JSON.stringify(er), 500);
};

// Only listen on $ node app.js
if(!module.parent) {
  app.listen(parseInt(process.env.PORT || 3000, 10));
}

