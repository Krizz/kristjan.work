var express = require('express');
var app = express();
var config = require('./config');

var status = null;
app.get('/', function(req, res) {
  res.json({
    status: status
  });
});

app.get('/status/:key/:status', function(req, res) {
  var data = {
    ok: 0
  };

  if (req.params.key === config.key) {
    status = req.params.status;
    data.ok = 1;
  }

  res.json(data);
});

app.listen(3000);