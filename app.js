const express = require('express')
const app = express()

// Einstellungen definieren
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var path = require('path')

// Pug als Render Engine definieren
app.engine('pug', require('pug').__express)
app.set('views', path.join('views'))
app.set('view engine', 'pug')

// Public statisch ausgeben und bodyParser definieren
app.use(express.static(path.join('public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

// Server starten
app.listen(port, function () {
  console.log('Listening on port ' + port)
})
