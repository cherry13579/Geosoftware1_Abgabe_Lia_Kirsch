<!--Funktion, diedie kürzeste Strecke zu einer Mensa finden soll-->
function naheMensa(lat,long) {
var streckeAasee = Math.sqrt((lat-51.9555792)*(lat-51.9555792))+((long-7.617196700000022)*(long-7.617196700000022));

var streckeRing = Math.sqrt((lat-51.9653883)*(lat-51.9653883))+((long-7.600809400000003)*(long-7.600809400000003));

var streckeBispinghof= Math.sqrt((lat-51.960425)*(lat-51.960425))+((long-7.619727000000012)*(long-7.619727000000012));

var streckeDaVinci= Math.sqrt((lat-51.9750306)*(lat-51.9750306))+((long-7.602077399999985)*(long-7.602077399999985));

var result

if(((streckeAasee < streckeRing) || ((streckeAasee < streckeBispinghof) || (streckeAasee < streckeBispinghof)))){
	result = "Gehe zur Mensa am Aasee";}
    else {
    if(((streckeRing < streckeAasee) || ((streckeRing < streckeBispinghof) || (streckeRing < streckeBispinghof)))){result = "Gehe zur Mensa am Ring";}
    else {
    if(((streckeBispinghof < streckeAasee) || ((streckeBispinghof < streckeAasee) || (streckeBispinghof < streckeBispinghof)))){result = "Gehe zur mensa am Bispinghof";}
    else {
    if(((streckeDaVinci < streckeAasee) || ((streckeDaVinci < streckeRing) || (streckeDaVinci < streckeBispinghof)))){result = "Gehe zur Mensa DaVinci";}}}
    }
    var data = '<br>' + result +  "<br>Bitte gebe nun in der Eingabespalte rechts in der Karte ihr Ziel und iheren Stadort ein.";
		return data
}

// Aktuelle Location beziehen
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Unter Funktion von getLocation()
function showPosition(position) {
	document.getElementById("status-box-body").innerHTML = position.coords.latitude + ',' + position.coords.longitude + '<br>Kopiere diese Koordinaten in das Startfeld und die Mensa in das Zielfeld<br>' + naheMensa(position.coords.latitude,position.coords.longitude);
  $("#status-box").modal();
}
