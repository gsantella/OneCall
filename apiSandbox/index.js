var express = require('express');
var app = express();

module.exports = app;

// Create the express router object
var oneCallRouter = express.Router();

// A GET to the root of a resource returns a list of that resource
oneCallRouter.get('/', function(req, res) {
  return res.json({ errors: ['Could not retrieve photo'] });
});

app.use('/onecall', oneCallRouter);
