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
oneCallRouter.get('/number', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({ numbers: [
    { id: 1, title: 8149379223 },
    { id: 2, title: 7247714542 },
    { id: 3, title: 8144215265 }  ]
  });
});

oneCallRouter.post('/number', function(req, res) {

  var num = req.body.num;

  const child = childProcess.execFile('/app/OneCall/scriptsSandbox/call-add-num.sh', [num], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    return res.json({ msg: ['OneCall Number Added '], 'result': stdout });
  });

});

oneCallRouter.delete('/number', function(req, res) {

  var num = req.body.num;

  const child = childProcess.execFile('/app/OneCall/scriptsSandbox/call-del-num.sh', [num], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    return res.json({ msg: ['OneCall Number Delete '], 'result': stdout });
  });

});

// Messages
oneCallRouter.get('/message', function(req, res) {
  return res.json({ msg: ['OneCall Message List'] });
});

oneCallRouter.get('/message/:id', function(req, res) {
  return res.json({ msg: ['OneCall Message' + req.params.id] });
});

app.use('/onecall', oneCallRouter);
