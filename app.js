var config = require('./config');
var express = require('express');
var app = express();
var moment = require('moment');

var options = {
  access_token:  config.up_access_token,
  client_secret: config.up_client_secret
};

var isSleeping = false;
var up = require('jawbone-up')(options);
var updateUp = function() {
  up.events.band.get({}, function(err, json) {
    var data = JSON.parse(json);

    if (data.data.items[0].action === 'enter_sleep_mode') {
      isSleeping = true;
    } else {
      isSleeping = false;
    }
  });
}

setInterval(updateUp, 5000);
updateUp();


app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static('public'));


var TogglClient = require('toggl-api');
var toggl = new TogglClient({apiToken: config.toggl_apy_key});

var today = new Date();
var startDate = moment().startOf('isoweek').toISOString();
var endDate =  moment().toISOString();

var togglHours = 0;
var getTogglStats = function() {
  toggl.getTimeEntries(startDate, endDate, function(err, timeEntries) {
    var totalDuration = 0;
    timeEntries.forEach(function(entry) {
      totalDuration += entry.duration;
    });

    var totalDurationInHours = totalDuration  / 60 / 60;
    togglHours = totalDurationInHours.toFixed(2);
  });
}

getTogglStats();
setInterval(getTogglStats, 10000);


var getPhrase = function(text) {
  var lng = {
    no: ["Nee", "Non", "Ne", "Nau", "Na", "Ne", "Ne", "Nej", "Nee", "Ne", "Ei","Nei", "Ei", "Non", "Nee", "No", "Non", "არა", "Nein", "Όχι", "Non", "Nem", "Nei", "No", "Nē", "Ne" ],
    yes: ["Ja", "Po", "Po", "Sí", "Ehe", "Da", "Ya", "Sin", "Sí", "Oo", "Ya", "Da", "Ja", "Ja", "Jes", "Jah",  "Ja", "Oui", "Ja", "Sì", "Si"]
  };
  phrase = text;
  if (text === 'no' || text === 'yes') {
    while(true) {
      phrase = lng[text][Math.floor(Math.random()*lng[text].length)];
      if (phrase.length < 5 && !phrase.match(/\(|\)/) && !phrase.length <= 1) {
        break;
      }
    }
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

    var statusText = getPhrase(status);


    res.render('./index', {
      status: status,
      statusText: statusText,
      duration: togglHours,
      isSleeping: isSleeping
    });
  });

});

var Datastore = require('nedb');
var db = new Datastore({ filename: __dirname + '/database', autoload: true });


//set status
app.get('/status/:key?/:status?', function(req, res) {
  var data = {
    ok: 0,
    isSleeping: isSleeping
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