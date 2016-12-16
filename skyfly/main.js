$(document).ready(function () {

  $(".button-collapse").sideNav();

  getFlights();

}) // end document.ready()

var latlong = [];
var map;
var markers;
var image;

function getFlights() {
  $.getJSON("https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796", function(flights) {
    displayFlights(flights)
  })
}

function displayFlights(data) {
  var contentStrings = []
  for (var i = 0; i < data.response.length; i++) {
    var fl = data.response[i];

    var spd = fl.speed.horizontal
    var speed = "Speed: " + spd + " mph"

    var alt = fl.geography.alt
    var altitude = "Altitude: " + alt + " ft"

    var dep = fl.departure_code
    var depart = "Departure: " + dep

    var arr = fl.arrival_code
    var arrive = "Arrival: " + arr

    var flt = fl.flight.name
    var flight = "Flight " + flt

    var call = fl.flight.callsign
    var callsign = "Callsign: " + call

    var acc = fl.flight.aircraft_code
    var acode = "Aircraft: " + acc

    var contentString = flight.bold() + " " + "<br/>" + depart + "<br/>" + arrive + "<br/>" + altitude + "<br/>" + speed + "<br/>" + acode + "<br/>" + callsign
    contentStrings[i] = contentString

    var x = {"lat": fl.geography.lat, "lng": fl.geography.lng}
    latlong[i] = x;
  }

  var image = {
    url: "http://www.clker.com/cliparts/T/i/o/c/X/Q/airplane-hi.png",
    scaledSize: new google.maps.Size(28, 28),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};

  markers = latlong.map(function(location, i) {
    var thing =  new google.maps.Marker({
      position: location,
      map: map,
      icon: image
      });

      var infowindow = new google.maps.InfoWindow({
        content: contentStrings[i]
      });

      thing.addListener('click', function() {
        map.setZoom(6);
        map.setCenter(thing.getPosition());
        infowindow.open(map, thing);
      });

      google.maps.event.addListener(infowindow, "closeclick", function () {
        map.panTo(this.getPosition())
        map.setZoom(3)
      })

      return thing;
    });
} // end displayFlights()

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {lat: 39.742043, lng: -104.991531}
  });
} // end initMap()
