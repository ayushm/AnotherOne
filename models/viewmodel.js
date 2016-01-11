var mongo               = require("mongodb").MongoClient;
var AnotherOne          = require("../app").AnotherOne;

function View() { };

View.specific = function(keyID, callback) {
    // var specificQuery = "SELECT time, keyID, text, author FROM `" + postBucketName + "` USE KEYS ($1)";
    // var specificQueryN1ql = N1qlQuery.fromString(specificQuery);
    // postBucket.query(specificQueryN1ql, [keyID], function(error, result) {
    AnotherOne.findOne({"keyID" : keyID}, function (error, result) {
        if (error || (result.length > 1)) {
            console.log(error);
            callback(error, null);
            return;
        }
        console.log(result[0].AnotherOne);
        callback(null, result[0].AnotherOne);
    });
};

View.everything = function (callback) {
    // var everythingQuery = "SELECT * FROM `" + postBucketName + "`";
    // var everythingQueryN1ql = N1qlQuery.fromString(everythingQuery);
    // postBucket.query(everythingQueryN1ql, function (error, result) {
    AnotherOne.find({}, function (error, result) {
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
    AnotherOne.find({}, function (error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        var randIndex = randomIntFromInterval(0, (result.length - 1));
        console.log("randIndex: " + randIndex);
        console.log("result");
        console.log(result);
        callback(null, result[randIndex].AnotherOne);
    });
};

View.count = function(callback) {
    // var countQuery = "SELECT COUNT(*) AS numKeys FROM `" + postBucketName + "`";
    // var countQueryN1ql = N1qlQuery.fromString(countQuery);
    // postBucket.query(countQueryN1ql, function (error, result) {
    AnotherOne.find({}, function (error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        callback(null, {"numKeys" : result.length});
    });
};


module.exports = View;
