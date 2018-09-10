var express = require('express')
var router = express.Router()

// Seite Impressum anzeigen
router.get('/', function (req, res) {
  res.render('impressum', {
    title: 'Impressum',
    active: 'Impressum'
  })
})

module.exports = router
