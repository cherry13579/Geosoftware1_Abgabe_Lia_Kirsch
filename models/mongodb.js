var mongodb = require('mongodb').MongoClient
var assert = require('assert')
var url = 'mongodb://root:example@mongodb:27017/?authMechanism=SCRAM-SHA-1&authSource=admin'

// Neuen Eintrag erstellen
function createObj (obj, colct) {
  mongodb.connect(url, function (err, db) {
    assert.equal(null, err)
    console.log('Connected correctly to server')
    var dbo = db.db('geodata')
    dbo.collection(colct).insertOne(obj, function (err, res) {
      if (err) throw err
      console.log('created 1 Object in collection: ' + colct)
      db.close()
      return 'Objekt wurde angelegt'
    })
  })
}

// Einträge abrufen
function getObj (query, colct, callback) {
  mongodb.connect(url, function (err, db) {
    assert.equal(null, err)
    var dbo = db.db('geodata')
    dbo.collection(colct).find(query).toArray(function (err, result) {
      if (err) throw err
      console.log(result)
      callback(err, result)
      db.close()
    })
  })
}

// Einen Eintrag abrufen
function getOneObj (query, colct, callback) {
  mongodb.connect(url, function (err, db) {
    assert.equal(null, err)
    var dbo = db.db('geodata')
    dbo.collection(colct).find(query).toArray(function (err, result) {
      if (err) throw err
      console.log(result)
      callback(err, result)
      db.close()
    })
  })
}

// Ein Objekt updaten
function updateObj (query, newdata, colct) {
  mongodb.connect(url, function (err, db) {
    assert.equal(null, err)
    var dbo = db.db('geodata')
    dbo.collection(colct).updateOne(query, newdata, function (err, res) {
      if (err) throw err
      console.log('1 document updated')
      db.close()
    })
  })
}

// Objekt löschen
function deleteObj (query, colct) {
  mongodb.connect(url, function (err, db) {
    assert.equal(null, err)
    var dbo = db.db('geodata')
    dbo.collection(colct).deleteOne(query, function (err, obj) {
      if (err) throw err
      console.log('1 document deleted')
      db.close()
    })
  })
}

module.exports = {
  createObj: createObj,
  getObj: getObj,
  getOneObj: getOneObj,
  updateObj: updateObj,
  deleteObj: deleteObj
}
