var express = require('express')
var router = express.Router()
var database = require('../models/mongodb')

// Seite Mappage anzeigen
router.get('/', function (req, res) {
  res.render('mappage', {
    title: 'Karte',
    active: 'Karte'
  })
})

// geoJSON in Datenbank eintragen
router.post('/addMarker', function (req, res) {
  database.createObj(req.body, 'marker')
  res.send('test')
})

module.exports = router
