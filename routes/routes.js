var Posts       = require("../models/postmodel");
var View        = require("../models/viewmodel");
var shortid     = require("shortid");
var multer      = require("multer");

var appRouter = function(app) {

    app.post("/api/uploadKey", function (req, res) {
        console.log(req.query);
        console.log(req.body);
        Posts.create(req.query, function (error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            // returns a doc of type {keyID: "someID"}
            res.json(result);
        });
    });

    app.get("/api/viewKey/:keyID", function (req, res) { // OK
        View.specific(req.params.keyID, function(error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            // returns a doc of type {time: "someTime", keyID: "someKeyID", text: "someText"}
            res.json(result);
        });
    });

    app.get("/api/viewEverything", function (req, res) { // OK
        View.everything(function(error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            // returns a doc of type {time: "someTime", keyID: "someKeyID", text: "someText"}
            res.json(result);
        });
    });

    app.get("/api/viewKeyRandom", function (req, res) { // OK
        View.random({}, function (error, randomKey) {
            if (error) {
                return res.status(400).send(error);
            }
            // redirect to path with the proper key
            // res.json(randomKey);
            res.redirect("../../api/viewKey/"+randomKey.keyID);
        });
    });

    app.get("/api/getCount", function (req, res) {  // OK
        View.count(function(error, result) {
            if (error) {
                return res.status(400).send(error);
            }
            // json obj with {numKeys: "someCount"}
            res.json(result);
        });
    });

    app.get('/', function(req, res) {
            console.log("getting to index.html"); // load the single view file (angular will handle the page changes on the front-end)
            res.sendfile('index.html');
    });

};

module.exports = appRouter;
