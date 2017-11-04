var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));

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
  return res.json({ msg: ['OneCall Sent ' + req.params.id] });
});

// Numbers
oneCallRouter.post('/number', function(req, res) {
  exec('/app/OneCall/scriptsSandbox/call.sh', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  return res.json({ msg: ['OneCall Number Add ' + req.body.num] });
});

oneCallRouter.delete('/number', function(req, res) {
  return res.json({ msg: ['OneCall Number Delete ' + req.body.num] });
});

// Messages
oneCallRouter.get('/message', function(req, res) {
  return res.json({ msg: ['OneCall Message List'] });
});

oneCallRouter.get('/message/:id', function(req, res) {
  return res.json({ msg: ['OneCall Message' + req.params.id] });
});

app.use('/onecall', oneCallRouter);
