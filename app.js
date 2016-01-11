// modules for the application
var express         = require('express');
var app             = express();
var config          = require("./config");
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var multer          = require('multer');
var fs              = require('fs');
var http            = require('http');
var cors            = require('cors');
var mongo           = require("mongodb").MongoClient;

var mongoURI = "mongodb://heroku_h6dk6mtx:lac4pujgurnrjciv2ff7qdhsel@ds039145.mongolab.com:39145/heroku_h6dk6mtx";

// use commands
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '4mb'}));
app.use(morgan('dev'));
app.use(cors());

// connect directories to save in memory before app is run, makes filepaths simpler
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/icons'));
app.use(express.static(__dirname + '/node_modules'));

// create cluster and create buckets using config file
// var cluster = new couchbase.Cluster(config.couchbase.server);
// module.exports.postBucket = cluster.openBucket(config.couchbase.postBucket);
mongo.connect(mongoURI, function(err, db) {
    if (err) {
        console.log(err);
        callback(err, null);
        return;
    }
    var AnotherOne = db.collection("AnotherOne");
});

// include API endpoints
var routes = require("./routes/routes.js")(app);

// set up HTTP and HTTPS if possible
var httpServer = http.createServer(app);
httpServer.listen(config.couchbase.AnotherPort);

// inform user of IP
console.log('View "AnotherOne" at localhost:' + config.couchbase.AnotherPort);
