var mongo               = require("mongodb").MongoClient;
var mongoURI            = require("../config").mongoURI;

var AnotherOne;
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

function View() { };

View.specific = function(keyID, callback) {
    // var specificQuery = "SELECT time, keyID, text, author FROM `" + postBucketName + "` USE KEYS ($1)";
    // var specificQueryN1ql = N1qlQuery.fromString(specificQuery);
    // postBucket.query(specificQueryN1ql, [keyID], function(error, result) {
    AnotherOne.find({"keyID" : keyID}).toArray(function (error, result) {
        if (error || (result.length > 1)) {
            console.log(error);
            callback(error, null);
            return;
        }
        console.log(result);
        callback(null, result[0]);
    });
};

View.everything = function (callback) {
    // var everythingQuery = "SELECT * FROM `" + postBucketName + "`";
    // var everythingQueryN1ql = N1qlQuery.fromString(everythingQuery);
    // postBucket.query(everythingQueryN1ql, function (error, result) {
    AnotherOne.find({}).toArray(function (error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, result);
    });
};

var randomIntFromInterval = function (min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

View.random = function(params, callback) {
    // var randomQuery = "SELECT keyID FROM `" + postBucketName + "` ORDER BY keyID";
    // var randomQueryN1ql = N1qlQuery.fromString(randomQuery);
    // postBucket.query(randomQueryN1ql, function (error, result) {
    AnotherOne.find({}).toArray(function (error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        var randIndex = randomIntFromInterval(0, (result.length - 1));
        console.log("randIndex: " + randIndex);
        console.log("result");
        console.log(result);
        callback(null, result[randIndex]);
    });
};

View.count = function(callback) {
    // var countQuery = "SELECT COUNT(*) AS numKeys FROM `" + postBucketName + "`";
    // var countQueryN1ql = N1qlQuery.fromString(countQuery);
    // postBucket.query(countQueryN1ql, function (error, result) {
    AnotherOne.find({}).toArray(function (error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, {"numKeys" : result.length});
    });
};


module.exports = View;
