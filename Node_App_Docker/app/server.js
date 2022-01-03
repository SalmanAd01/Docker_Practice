const express = require("express");
const path = require("path");
const fs = require("fs");
let MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/profile-picture", function (req, res) {
    try {
        let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(img, "binary");
    } catch (err) {
        console.log(err);
    }
});
app.get('/get-profile', (req, res) => {
    var response = res
    try {
        console.log("get-profile");
        MongoClient.connect("mongodb://admin:password@localhost:27017", function (err, client) {
            console.log("get-profile");
            if (err) throw err;
            try {

                var db = client.db("user-account");
                console.log(db);
                return response.send("result");
            }


            catch (err) {
                console.log(err);
            }
            var query = { userid: 1 };
            db.collection('users').findOne(query, function (err, result) {
                if (err) throw err;
                client.close();
            })
        });
    }
    catch (err) {
        console.log('-->>> ', err);
    }
});
app.post('/update-profile', (req, res) => {
    var userObj = req.body
    var response = res
    console.log('Connecting to mongoDB...', userObj);
    try {
        MongoClient.connect("mongodb://admin:password@localhost:8081", function (err, client) {
            console.log('Connected to mongoDB');
            try {
                const db = client.db('user-account');
                userObj['userid'] = 1;
                var myquery = { userid: 1 };
                var newvalues = { $set: userObj };
                db.collection("users").updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
                    if (err) throw err;
                    client.close();
                    response.send(userObj);
                });
            }
            catch (err) {
                console.log('-->>> ', err);
            }

        });
    }
    catch (err) {
        console.log("--->>. ", err);
    }


})
app.listen(3000, function () {
    console.log("http://localhost:3000");
});
