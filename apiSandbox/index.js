var express = require('express');
var bodyParser = require('body-parser');
var childProcess = require('child_process');

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

  const child = childProcess.execFile('/app/OneCall/scriptsSandbox/call.sh', [''], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    return res.json({ msg: ['OneCall Sent ' + req.params.id], 'result': stdout });
  });

});

// Numbers
oneCallRouter.post('/number', function(req, res) {

  const child = childProcess.execFile('/app/OneCall/scriptsSandbox/call-add-num.sh', req.body.num, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    return res.json({ msg: ['OneCall Number Add ' + req.body.num], 'result': 'success' });
  });

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
