// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members = [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/f415eb8d7a";

    const options = {
        method: "POST",
        auth: "hordak:b95df3ff5c95fdd63b3ce086b04fb288-us8"
    };
    
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write();
    request.end();
    
});




app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// API key
// b95df3ff5c95fdd63b3ce086b04fb288-us8

// Audience/list id
// f415eb8d7a
