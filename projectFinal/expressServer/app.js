
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();
const path = require('path');
var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/devwp', // Connection string for your MongoDB database
    cloud: '/media/navidx/E658E07858E0493F/sharif uni/SystemAnalyzeDesign/project/finalProj/NavbarExtracted copy/expressServer/cloud/cloudWhere', // Absolute path to your Cloud Code
    appId: 'myAppId123456',
    javascriptKey: '1xoWtDkxw8oZvX3bzhdTuHU7KZB8SGZD9jWQ2V9p',
    masterKey: 'myMasterKey123456', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:8030/wp', // Don't forget to change to https if needed
});

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:8030/wp",
            "appId": "myAppId123456",
            "masterKey": "myMasterKey123456",
            "appName": "MyApp"
        }
    ]
}, options);

// Serve the Parse API on the /parse URL prefix
app.use('/wp', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);
// app.all('/', function (request, response){
//     response.sendFile('/Users/omid_ch/Documents/SUT/Term8/Tahlil tarrahi Fazli/last phase/routed_ui/react/public/index.html')
// });



var httpServer = require('http').createServer(app);
httpServer.listen(8030, function() {
    console.log('parse-server-example running on port 8030.');
});

