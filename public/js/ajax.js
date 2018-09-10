// POST an addMarker URL
function addMarker (id) {
  var url = 'http://localhost:3000/mappage/addMarker'
  var mark = document.getElementById(id).value

  $.ajax({
    type: 'POST',
    url: url,
    data: mark,
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      console.log('success')
      console.log(JSON.stringify(data))
    }
  })
  document.getElementById("status-box-body").innerHTML = 'Daten wurden erfolgreich eingetragen';
  $("#status-box").modal();
}

// GET um alle Marker zu indexieren
function getAllMarker() {
  var url = 'http://localhost:3000/suche/marker/all'
  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {
      console.log('success')
      console.log(data)

      var entries = Object.entries(data.marker)
      var i = 0

      for (var [lat, lon] of entries){
      	console.log(lat + ":" + lon);
      	createMarker(lat, lon, data.ids[i]);
        i++;
      }
    }
  })
}

// GET um ein Institut zu suchen
function searchInst() {
  var query = document.getElementById('search-query').value
  var url = 'http://localhost:3000/suche/inst/' + query

  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {
      console.log('success')
      console.log(data)
      window.location.href = "http://localhost:3000/suche/" + data;
    }
  })
}

// POST um Institut zu updaten
function updateInst() {
  var id = document.getElementById('id').value
  //var coords = document.getElementById('coords').value
  var name = document.getElementById('name').value
  var imgurl = document.getElementById('imgurl').value
  var fach = document.getElementById('fach').value

  var data = {
    id: id,
    name: name,
    imgurl: imgurl,
    fach: fach
  }

  var url = 'http://localhost:3000/suche/' + id + '/update'

  var json = JSON.stringify(data)

  $.ajax({
    type: 'POST',
    url: url,
    data: json,
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      console.log('success')
      console.log(JSON.stringify(data))
    }
  })
  document.getElementById("status-box-body").innerHTML = 'Daten wurden erfolgreich eingetragen';
  $("#status-box").modal();
}

// GET um Institut zu löschen
function deleteInst(id) {
  var url = 'http://localhost:3000/suche/' + id + '/delete'

  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {
      console.log('success')
      console.log(data)
    }
  })
}
