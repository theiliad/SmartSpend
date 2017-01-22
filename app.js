var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

require('run-middleware')(app);

var request = require('request');
var cors = require('cors');

const assert = require(`assert`);

var apiai = require('apiai');
var apiAiApp = apiai("9190bb1c91a04f6cbf192738afa7e88e");

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://transaction-ai.firebaseio.com"
});

var db = admin.database();
var conversationRef = db.ref("conversation");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.options('*', cors());

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var alreadyLoaded = false;

app.get('/', cors(), function (req, res) {
    res.render('index');
});

module.exports = app;