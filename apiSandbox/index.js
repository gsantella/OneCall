var express = require('express');
var app = express();

module.exports = app;

// Create the express router object
var oneCallRouter = express.Router();

// OneCalls
// A GET to the root of a resource returns a list of that resource
oneCallRouter.get('/send', function(req, res) {
  return res.json({ msg: ['OneCall Send List'] });
});

// A GET to the root of a resource returns that resource
oneCallRouter.get('/send/:id', function(req, res) {
  return res.json({ msg: ['OneCall Sent' + req.params.id] });
});

// Numbers
oneCallRouter.post('/number/:num', function(req, res) {
  return res.json({ msg: ['OneCall Sent' + req.params.id] });
});

oneCallRouter.delete('/number/:num', function(req, res) {
  return res.json({ msg: ['OneCall Sent' + req.params.id] });
});

// Messages
oneCallRouter.get('/message', function(req, res) {
  return res.json({ msg: ['OneCall Message List'] });
});

oneCallRouter.get('/message/:id', function(req, res) {
  return res.json({ msg: ['OneCall Message' + req.params.id] });
});

app.use('/onecall', oneCallRouter);
