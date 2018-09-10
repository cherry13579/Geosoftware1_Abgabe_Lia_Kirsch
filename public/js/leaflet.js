var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
		map = new L.Map('mapid', { center: new L.LatLng(51.961, 7.618), zoom: 13 }),
		drawnItems = L.featureGroup().addTo(map);
L.control.layers({
		'osm': osm.addTo(map),
		"google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
				attribution: 'google'
		})
}, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
map.addControl(new L.Control.Draw({
		edit: {
			featureGroup: drawnItems,
			poly: {
					allowIntersection: false
			}
		},
	 draw: {
				polygon: {
						allowIntersection: false,
						showArea: true
				}
		}
}));


<!-- Konnte keinen Marker mehr setzen-, Karte verschwindet->
		var geoJsonLayers = {
				"type": "FeatureCollection",
				"features": []
		};
		<!-- Ermöglicht die Kreise, Plygone etc auf die Karte hinzuzufügen-->
		map.on(L.Draw.Event.CREATED, function (event) {
				var layer = event.layer;

				geoJsonLayers.features.push(layer.toGeoJSON());
				drawnItems.addLayer(layer);
		});

<!-- Hereausfinden, wo man gerade ist und automatisches dorthin zoomen-->
		function getPosition() {
				map.locate({ setView: true, maxZoom: 16 });
		}

		function onLocationFound(e) {
				var radius = e.accuracy / 2;

				L.marker(e.latlng).addTo(map)
						.bindPopup("Du befindest dich hier!").openPopup();

				L.circle(e.latlng, radius).addTo(map);
		}

<!-- Ermöglicht das runterladen als Geojsn -->
		function getGeoJSON() {
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("" + JSON.stringify(geoJsonLayers)));
				element.setAttribute('download', 'featuresGeoJSON.JSON');

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();

				document.body.removeChild(element);
		}

		<!-- Routing Machine-->

		L.Routing.control({
			waypoints: [
				L.latLng( 51.9606649, 7.6261347),
				L.latLng(51.969371, 7.595696)
			],
			routeWhileDragging: true,
			geocoder: L.Control.Geocoder.nominatim()
		}).addTo(map);



<!-- Erstellt das Mensa Icon-->
		var mensaIcon = L.icon({
iconUrl: 'http://localhost:3000/img/icon-2.png',


iconSize:     [55, 65], // size of the icon
iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
shadowAnchor: [4, 62],  // the same for the shadow
popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

<!-- MENSEN DER UNI MÜNSTER  als Pop Up mit Bild,Adresse und Link mit Gericht des Tages und dem Preis-->


var markerA = L.marker([51.9653883, 7.600809400000003],{icon:mensaIcon}).addTo(map).on("click", function(ev){
 var today = new Date();
 var queryDate = today.getFullYear() + '-' + (parseInt(today.getMonth())+1) + '-'+ (parseInt(today.getDate()) );
 $.get('https://openmensa.org/api/v2/canteens/226/days/'+ queryDate +'/meals', function(data){
	 var html = "<table><tr><th>Tagesgericht</th><th>Preis Student*in</th><th>Preis Mitarbeiter*in</th><th>Preis Andere</th></tr>"
	 var html2 = "";
	 for (var dataItem in data){
		 html2 += "<tr><td>"+data[dataItem].name +"</td><td>"+data[dataItem].prices.students +"</td><td>"+data[dataItem].prices.employees +"</td><td>"+data[dataItem].prices.others +"</td></tr>";

	 }
		html2 += "</table>"
	 markerA.bindPopup("Mensa am Ring   <br>  Domagkstraße 61 <br> 48149 Münster <br> "+" <image src='https://www.uni-muenster.de/imperia/md/images/allgemein/2014/leben/grewer_mensa_am_ring_2048x1363.jpg' width='150px'></image> <br> <br>"+html + html2).openPopup();

 })
});


		var markerB = L.marker([51.9555792, 7.617196700000022],{icon:mensaIcon}).addTo(map).on("click", function(ev){
			var today = new Date();
			var queryDate = today.getFullYear() + '-' + (parseInt(today.getMonth())+1) + '-'+ (parseInt(today.getDate()) );
			$.get('https://openmensa.org/api/v2/canteens/226/days/'+ queryDate +'/meals', function(data){
				var html = "<table><tr><th>Tagesgericht</th><th>Preis Student*in</th><th>Preis Mitarbeiter*in</th><th>Preis Andere</th></tr>"
				var html2 = "";
				for (var dataItem in data){
					html2 += "<tr><td>"+data[dataItem].name +"</td><td>"+data[dataItem].prices.students +"</td><td>"+data[dataItem].prices.employees +"</td><td>"+data[dataItem].prices.others +"</td></tr>";

				}
				 html2 += "</table>"
				markerB.bindPopup("Mensa am Aasee   <br>  Bismarckallee 11 <br> 48151 Münster <br> "+" <image src='http://www.aaseepark.de/wp-content/uploads/2016/11/aaseepark_mensa2.jpg' width='150px'></image> <br> <br>"+html + html2).openPopup();

			})
		});

		var markerC = L.marker([51.9750306, 7.602077399999985],{icon:mensaIcon}).addTo(map).on("click", function(ev){
			var today = new Date();
			var queryDate = today.getFullYear() + '-' + (parseInt(today.getMonth())+1) + '-'+ (parseInt(today.getDate()) );
			$.get('https://openmensa.org/api/v2/canteens/228/days/'+ queryDate +'/meals', function(data){
				var html = "<table><tr><th>Tagesgericht</th><th>Preis Student*in  </th><th>Preis Mitarbeiter*in</th><th>Preis Andere</th></tr>"
				var html2 = "";
				for (var dataItem in data){
					html2 += "<tr><td>"+data[dataItem].name +"</td><td>"+data[dataItem].prices.students +"</td><td>"+data[dataItem].prices.employees +"</td><td>"+data[dataItem].prices.others +"</td></tr>";

				}
				 html2 += "</table>"
				markerC.bindPopup("DA Vinci  <br> Leonardo-Campus 8 <br>  48149 Münster <br> "+"<image src='http://www.wbingenieure.de/typo3temp/pics/07391d8a9a.jpg' width='150px'></image> <br> <br>"+html + html2).openPopup();

			})
		});

		var markerD = L.marker([51.960425, 7.619727000000012],{icon:mensaIcon}).addTo(map).on("click", function(ev){
			var today = new Date();
			var queryDate = today.getFullYear() + '-' + (parseInt(today.getMonth())+1) + '-'+ (parseInt(today.getDate()) );
			$.get('https://openmensa.org/api/v2/canteens/225/days/'+ queryDate +'/meals', function(data){
				var html = "<table><tr><th>Tagesgericht</th><th>Preis Student*in </th> <th> Mitarbeiter*in </th><th> Andere  </th></tr>"
				var html2 = "";
				for (var dataItem in data){
					html2 += "<tr><td>"+data[dataItem].name +"</td><td>"+data[dataItem].prices.students +"</td><td>"+data[dataItem].prices.employees +"</td><td>"+data[dataItem].prices.others +"</td></tr>";

				}
				 html2 += "</table>"
				markerD.bindPopup("Bispinghof  <br> Bispinghof 9  <br> 48143 Münster <br> "+"<image src='https://www.stw-muenster.de/content/uploads/2016/08/DSC_4353.jpg' width='150px'></image> <br> <br>"+html + html2).openPopup();

			})
		});

function createMarker(lat, lon, id) {
	L.marker([lat, lon]).addTo(map).on('click', function(id){
	alert(this.getLatLng());
	});
};

getAllMarker();
