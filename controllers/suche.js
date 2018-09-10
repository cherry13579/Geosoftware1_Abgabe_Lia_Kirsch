var express = require('express');
var router = express.Router();
var database = require('../models/mongodb')
var mongo = require('mongodb')

// Seite Suche anzeigen
router.get('/', function (req, res) {
  res.render('suche', {
    title: 'Suche',
    active: 'Suche'
  });
});

// Alle Marker aus der Datenbank abfragen
router.get('/marker/all', function (req, res) {
  database.getObj('', 'marker', function (err, result) {
    var marker = {}
    var ids = []
    for (x in result) {
      if (result[x].type == 'Feature') {
        var lon = result[x].geometry.coordinates[0];
        var lat = result[x].geometry.coordinates[1];
        marker[lat] = lon;
        ids[x] = result[x]._id;
      } else if (result[x].type == 'FeatureCollection') {
        for (xx in result[x].features){
          var lon = result[x].features[xx].geometry.coordinates[0];
          var lat = result[x].features[xx].geometry.coordinates[1];
          marker[lat] = lon;
          ids[x] = result[x]._id;
        }
      } else {
        console.log('Can´t import marker: ' + result[x]._id)
      }
    }
    var data = {
      marker: marker,
      ids: ids
    }
    res.send(data)
  });
});

// Alle Institute anzeigen
router.get('/inst/all', function(req, res){
  database.getObj('', 'marker', function (err, result) {
    var data = []
    var id
    var name
    var imgurl
    var fach
    for (x in result) {
      if (result[x].type == 'Feature') {
        var lon = result[x].geometry.coordinates[0];
        var lat = result[x].geometry.coordinates[1];
        var marker = []
        marker[0] = lat;
        marker[1] = lon;
        id = result[x]._id;
        name = result[x].name
        imgurl = result[x].imgurl
        fach = result[x].fach
        data[x] = {
          id: id,
          marker: marker,
          name: name,
          imgurl: imgurl,
          fach: fach
        };
      } else if (result[x].type == 'FeatureCollection') {
        for (xx in result[x].features){
          var lon = result[x].features[xx].geometry.coordinates[0];
          var lat = result[x].features[xx].geometry.coordinates[1];
          var marker = []
          marker[0] = lat;
          marker[1] = lon;
          id = result[x]._id;
          name = result[x].name
          imgurl = result[x].imgurl
          fach = result[x].fach
          data[x] = {
            id: id,
            marker: marker,
            name: name,
            imgurl: imgurl,
            fach: fach
          };
        }
      } else {
        console.log('Can´t import marker: ' + result[x]._id)
      }
    }
    res.render('inst', {
      data: data
    })
  });
})

// Suche per ID
router.get('/:id', function(req, res) {
  var o_id = new mongo.ObjectID(req.params.id)
  database.getOneObj({'_id': o_id}, 'marker', function(err, result) {
    var id, coords, name, imgurl, fach
    if (result[0].type == 'Feature') {
      id = result[0]._id
      coords =[result[0].geometry.coordinates[1], result[0].geometry.coordinates[0]]
      if (result[0].name != null) {
        name = result[0].name
      }else {
        name = 'Name hier eintragen'
      }
      if (result[0].imgurl != null) {
        imgurl = result[0].imgurl
      }else {
        imgurl = 'Img-Url hier eintragen'
      }
      if (result[0].fach != null) {
        fach = result[0].fach
      }else {
        fach = 'Fachbereich hier eintragen'
      }
    } else if (result[0].type =='FeatureCollection') {
      id = result[0]._id
      coords =[result[0].features[0].geometry.coordinates[1], result[0].features[0].geometry.coordinates[0]]
      if (result[0].name != null) {
        name = result[0].name
      }else {
        name = 'Name hier eintragen'
      }
      if (result[0].imgurl != null) {
        imgurl = result[0].imgurl
      }else {
        imgurl = 'Img-Url hier eintragen'
      }
      if (result[0].fach != null) {
        fach = result[0].fach
      }else {
        fach = 'Fachbereich hier eintragen'
      }
    }
    res.render('one-object', {
      id: id,
      coords: coords,
      name: name,
      imgurl: imgurl,
      fach: fach
    })
  })
});

// Institut in der Datenbank updaten
router.post('/:id/update', function (req, res) {
  var o_id = new mongo.ObjectID(req.body.id)
  var newvalues = { $set: {name: req.body.name, imgurl: req.body.imgurl, fach: req.body.fach } }
  database.updateObj({'_id': o_id}, newvalues, 'marker')
})

// Institut in der Datenbank löschen
router.get('/:id/delete', function (req, res) {
  var o_id = new mongo.ObjectID(req.params.id)
  database.deleteObj({'_id': o_id}, 'marker')
})

// Suchabfrage per Name des Instituts
router.get('/inst/:query', function (req, res){
  var query = req.params.query
  database.getOneObj({'name': query}, 'marker', function(err, result) {
    res.send(result[0]._id)
  })
})

module.exports = router;
