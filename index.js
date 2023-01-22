// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// whoami endpoint
app.get('/api/whoami', function (req, res) {
  // Get the user's IP address
  let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Get the user's preferred language
  let language = req.headers['accept-language'].split(',')[0];

  // Get the user's software information
  let software = req.headers['user-agent'].split(') ')[0].split(' (')[1];

  res.json({
    "ipaddress": ipaddress,
    "language": language,
    "software": software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
