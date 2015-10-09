var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname);

var config = require('./config');



var getPhrase = function(text) {
  var lng = {
    no: ['não', 'Нет', 'nein', 'Ei', 'Non'],
    yes: ['Да','Sí','Oui','Jah', 'Ya']
  };
  phrase = text;
  if (text === 'no' || text === 'yes') {
    phrase = lng[text][Math.floor(Math.random()*lng[text].length)];
  }

  return phrase;
}

app.get('/', function(req, res) {
  db.find({})
  .sort({ date: -1})
  .limit(1).exec(function (err, docs) {
    var status = 'nothing here';
    if (docs.length) {
      status = docs[0].status;
    }

    var status = getPhrase(status);


    res.render('./index', {
      status: status
    });
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
      var status = req.params.status;
      data.ok = 1;

      db.insert({
        status: status,
        date: new Date()
      });

    } else {
      data.ok = 0;
      data.err = 'Auth Fail!';
    }

    res.json(data);
  } else {
    data.ok = 1;

    db.find({})
    .sort({ date: -1})
    .limit(1).exec(function (err, docs) {
      data.status = 'nothing here';
      if (docs.length) {
        data.status = docs[0].status;
        data.status = getPhrase(data.status);

      }
      res.json(data);
    });
  }
});

app.listen(3000);