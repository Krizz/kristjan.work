var express = require('express');
var app = express();
var moment = require('moment');


app.set('view engine', 'jade');
app.set('views', __dirname);
app.use(express.static('public'));

var config = require('./config');

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
    togglHours = totalDurationInHours;
  });
}

getTogglStats();
setInterval(getTogglStats, 10000);


var getPhrase = function(text) {
  var lng = {
    no: ["Хьау", "Nee", "Jo", "Jo", "Indi", "لأ", "لا", "Non", "Nama", "ना", "Ne", "Nann", "Не", "Nau", "No", "Wala", "ʔį́lé", "Na", "Ne", "Ne", "Nej", "Nee", "Ne", "Ei", "Aao", "Nei", "Ei", "", "Non", "Nee", "No", "Non", "არა", "Nein", "Όχι", "Non", "A'a", "ʻAʻole", "לא", "Tsis Tsis yog (it isn't)", "Nem", "Nei", "No", "No", "いいえ (īe)", "Hî-î.", "Tiaki", "Na", "Nē", "Ne", "na go'i", "Не (Ne)", "Tsia", "Tidak Tak (inf)", "Le", "होइन", "Aowa", "Nei", "Nie", "Não", "Nu", "Нет", "नैव किल (naiva kila)  न", "Naw", "Не (Ne)", "No", "Nie", "Ne", "No", "Lae", "Nogat", "Nej", "Hayır", "Ні", "Yo'q", "Hayi", "Bẹẹ kọ  Ó ti  Ra ra", "Cha"],
    yes: ["Ары", "Ja", "Po", "Po", "Huo", "أيوه نعم", "أه", "Sí", "Ehe", "हाँ", "Da", "Ya", "Да (Da)", "Sin", "Sí", "Oo", "ʔę́n", "Ya", "Da", "Ano", "Ja", "Ja", "Jes", "Jah", "Aa Eee", "Ja", "Kyllä", "Joat", "Oui", "Ja", "Sì", "Si", "დიახ - კი (k’i) ჰო (ho) - inf ხო (kho) - inf", "Ja", "Ναι (Nai)", "Wi", "Eh", "ʻAe", "(ken) כן", "Yog (it is)", "Igen", "Já", "Si", "Sì", "はい (hai) = that is correct, affirmative", "Î.", "E eng", "Balê Erê", "Jā", "Taip", "go'i", "Да (Da)", "Eny", "Ya", "Iva", "हो", "Ee", "Ja", "Tak", "Sim", "Da", "Да", "भवतु (bhavatu) आम् अस्तु", "Ay", "Да", "Se", "Áno", "Da", "Sí", "Sin", "Yesa", "Ja", "Evet", "Так", "Ha", "Ewe", "Bẹẹ ni", "Yebo"]
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