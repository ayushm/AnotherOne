var shortid             = require("shortid");
var mongo               = require("mongodb").MongoClient;
var mongoURI            = require("../config").mongoURI;
var bodyParser          = require('body-parser');

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

function Posts() { };

Posts.create = function(params, callback) {
    var currentTime = new Date().toISOString();
    var keyDoc = {
        time: currentTime,
        keyID: ("majorkey_"+shortid.generate()),
        author: params.author,
        text: params.quote
    };
    console.log(keyDoc);
    // var insertPub = N1qlQuery.fromString('INSERT INTO ' + postBucketName + ' (KEY, VALUE) VALUES ($1, $2)');
    // postBucket.query(insertPub, [keyDoc.keyID, keyDoc], function (err, result) {
    AnotherOne.insert(keyDoc, function(error, result) {
        if (error) {
            console.log(error);
            callback(error, null);
            return;
        }
        var idDoc = {"keyID" : keyDoc.keyID};
        callback(null, idDoc);
    });
};

// Posts.search = function(params, callback) {
//     var searchQuery = "SELECT time, keyID, text FROM "+postBucketName+" WHERE type='post' ";
//     if (params.text) {
//         searchQuery += ("AND text LIKE LOWER(%\""+params.text+"\"%) ");
//     }
//     searchQuery += "ORDER BY time DESC";
//     var searchQueryN1ql = N1qlQuery.fromString(searchQuery);
//     console.log(pubQueryN1ql);
//     postBucket.query(searchQueryN1ql, function (error, result) {
//         if (error) {
//             console.log(error);
//             callback(error, null);
//             return;
//         }
//         callback(null, result);
//     });
// };
//
// Posts.remove = function(params, callback) {
//     console.log(params);
//     var deleteQuery = N1qlQuery.fromString('DELETE FROM '+postBucketName+' USE KEYS ($1)');
//     console.log(deleteQuery);
//     console.log("pubID: " + params.keyID);
//     postBucket.query(deleteQuery, [params.keyID], function(err, result) {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//             return;
//         }
//         callback(null, {message: "success", data: result});
//     });
// };


module.exports = Posts;
