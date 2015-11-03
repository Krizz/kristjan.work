var express = require('express');
var app = express();
var moment = require('moment-timezone');
moment.tz.setDefault("Europe/Tallinn");
app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static('public'));

var config = require('./config');

var TogglClient = require('toggl-api');
var toggl = new TogglClient({apiToken: config.toggl_apy_key});

var today = new Date();
var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();
var endDate =  (new Date()).toISOString();


var twilio = require('twilio');
var twilioClient = new twilio.RestClient(config.twilio.sid, config.twilio.token);

var togglHours = 0;
var getTogglStats = function() {
  toggl.getTimeEntries(startDate, endDate, function(err, timeEntries) {
    var totalDuration = 0;
    timeEntries.forEach(function(entry) {
      totalDuration += entry.duration;
    });

    var totalDurationInHours = totalDuration  / 60 / 60;
    togglHours = totalDurationInHours;
  });
};

getTogglStats();
setInterval(getTogglStats, 10000);


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
};

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
      duration: togglHours
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
      var status = req.params.status || 'no';
      data.ok = 1;

      db.findOne({})
      .sort({ date: -1})
      .exec(function (err, doc) {
        var lastStatus = doc.status;

        db.insert({
          status: status,
          date: new Date()
        });

        if (lastStatus !== status && status === 'yes') {
          var upperLimit = moment()
          .hours(12)
          .minutes(0);

          var lowerLimit = moment()
          .hours(9)
          .minutes(0);

          var now = moment();

          var isInTimeLimit = now.isBetween(lowerLimit, upperLimit);

          if (isInTimeLimit) {
            var currentTime = moment().format('HH:mm');
            console.log('SENDING MESSAGE');
            console.log(`${config.user.name}@work ${currentTime}`);

            twilioClient.messages.create({
                to: config.twilio.to,
                from: config.twilio.from,
                body: `${config.user.name}@work ${currentTime}`,
            }, function(error, message) {
                if (error) {
                    console.log(error.message);
                }
            });

          } else {
            console.info('Too Late');
          }
        }
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