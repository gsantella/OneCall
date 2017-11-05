var express = require('express');
var bodyParser = require('body-parser');
var childProcess = require('child_process');
var lineReader = require('line-reader');
var cors = require('cors');

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

module.exports = app;

// Create the express router object
var oneCallRouter = express.Router();

// OneCalls
// A GET to the root of a resource returns a list of that resource
oneCallRouter.get('/send', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  return res.json({ msg: ['OneCall Send List'] });
});

// A GET to the root of a resource returns that resource
oneCallRouter.get('/send/:id', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
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
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  var output = {};
    //{ "id": "4", "title": "1111111111" },
    //{ "id": "5", "title": "222222222222" },
    //{ "id": "6", "title": "33333333333" }
  //] };

  var counter = 1;

  output.numbers = [];

  lineReader.eachLine('/app/OneCall/config/numbers.txt', function(line, last) {

    var number = {};
    number.id = counter;
    number.title = line;
    output.numbers.push(number);
    counter += 1;

    if (last) {
      return res.json(output);
    }

  });

});

oneCallRouter.get('/number/add/:num', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  //var num = req.body.num;
  var num = req.params.num;

  const child = childProcess.execFile('/app/OneCall/scriptsSandbox/call-add-num.sh', [num], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    return res.json({ msg: ['OneCall Number Added '], 'result': stdout });
  });

});

oneCallRouter.get('/number/delete/:num', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  //var num = req.body.num;
  var num = req.params.num;

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
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  return res.json({ msg: ['OneCall Message List'] });
});

oneCallRouter.get('/message/:id', function(req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  return res.json({ msg: ['OneCall Message' + req.params.id] });
});

app.use('/onecall', oneCallRouter);
