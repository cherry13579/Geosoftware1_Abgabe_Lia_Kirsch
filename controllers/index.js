var express = require('express')
var router = express.Router()

// Konfiguration der Main Routen
router.use('/mappage', require('./mappage'))
router.use('/impressum', require('./impressum'))
router.use('/suche', require('./suche'))

// Seite Index anzeigen
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Starseite',
    active: 'Start'
  })
})

module.exports = router
