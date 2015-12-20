// modules for the application
var couchbase       = require('couchbase');
var express         = require('express');
var app             = express();
var config          = require("./config");
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var multer          = require('multer');
var fs              = require('fs');
var http            = require('http');
var cors            = require('cors');

// use commands
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded ({     // to support URL-encoded bodies
  extended: true
}));

// connect directories to save in memory before app is run, makes filepaths simpler
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/icons'));
app.use(express.static(__dirname + '/node_modules'));

// create cluster and create buckets using config file
var cluster = new couchbase.Cluster(config.couchbase.server);
module.exports.postBucket = cluster.openBucket(config.couchbase.postBucket);

// include API endpoints
var routes = require("./routes/routes.js")(app);

// set up HTTP and HTTPS if possible
var httpServer = http.createServer(app);
httpServer.listen(config.couchbase.AnotherPort);

// inform user of IP
console.log('View "AnotherOne" at localhost:' + config.couchbase.AnotherPort);
