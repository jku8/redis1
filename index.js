//Load express module with `require` directive
var express = require('express');
var app = express();
var NRP    = require('node-redis-pubsub');
var config = {
  port  : 6379  , // Port of your locally running Redis server
  scope : 'demo'  // Use a scope to prevent two NRPs from sharing messages
};
var nrp = new NRP(config);
var request = require('request');
var buf = new Buffer(35);

//Define request response in root URL (/)
app.get('/tracking/track.gif', function (req, res) {
  nrp.emit('say hello', { name: req.headers.host });
  buf.write("R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");
  res.send(buf, { 'Content-Type': 'image/gif' }, 200);
});

//Launch listening server on port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!');
});