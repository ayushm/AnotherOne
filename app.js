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
var mongoURI        = require("./config").mongoURI;

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
    console.log(db);
    AnotherOne = db.collection("AnotherOne");
    AnotherOne.find({}).toArray(function(error, result) {
        if (error) {
            console.error(error);
            return;
        }
        module.exports.AnotherOne = AnotherOne;
        console.log("FIND RESULT");
        console.log(result);
    });
});

// include API endpoints
var routes = require("./routes/routes.js")(app);

// set up HTTP and HTTPS if possible
var AnotherPort = process.env.PORT || 3000;
var httpServer = http.createServer(app);
httpServer.listen(AnotherPort);

// inform user of IP
console.log('View "AnotherOne" at localhost:' + AnotherPort);
