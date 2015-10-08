var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname);

var config = require('./config');
var status = 'doing nothing';

app.get('/', function(req, res) {
  res.render('./index', {
    status: status
  });
});

var Datastore = require('nedb');
var db = new Datastore({ filename: __dirname + '/database', autoload: true });


//set status
app.get('/status/:key?/:status?', function(req, res) {
  var data = {
    ok: 0
  };

  var key = req.params.key;

  if (key) {
    if (key === config.key) {
      status = req.params.status;
      data.ok = 1;

      db.insert({
        status: status,
        date: new Date()
      });

    } else {
      data.ok = 0;
      data.err = 'Auth Fail!';
    }
  } else {
    data.ok = 1;
    data.status = status;
  }


  res.json(data);
});

app.listen(3000);