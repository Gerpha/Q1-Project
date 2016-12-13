var latlong = []
// $(document).ready(function () {
  getFlights()

  $("#btn1").click(function () {
    event.preventDefault()
    var $title = $("input[name=search]")
    var names = $title.val()
    $title.val('')
    getAirline(names)
    getAirports(names)
  })
//}) // end document.ready()

function getAirline(names) {
  $.getJSON("https://iatacodes.org/api/v6/airlines?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airline) {
    $(".airline").html("")
    displayAirlineInfo(airline)
  })
}

function displayAirlineInfo(data) {
    var x = data.response[0]
    var validData = {}
    for (var key in x) {
      if (x[key] !== null) {
       validData[key] = x[key]
       var $li = $('<li>')
       var k = key + ": " + x[key]
       $li.text(k)
       $(".airline").append($li)
      }
    }
}

function getAirports(names) {
  $.getJSON("https://iatacodes.org/api/v6/airports?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airport) {
    $(".airport").html("")
    displayAirportInfo(airport)
  })
}



function displayAirportInfo(data) {
  var ap = data.response[0]
  var apObj = {}
  for (var key in ap) {
    if (ap[key] !== null) {
      apObj[key] = ap[key]
      var $aplist = $("<li>")
      var p = key + ": " + ap[key]
      $aplist.text(p)
      $(".airport").append($aplist)
    }
  }
}

function getFlights() {
  $.getJSON("https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796", function(flights) {
    //$(".flights").html("")
    localStorage.setItem("raw_data", flights)
    displayFlights(flights)
  })
}

function displayFlights(data) {
  for (var i = 0; i < data.response.length; i++) {
    var fl = data.response[i]
    //localStorage.getItem("raw_data")
    var x = {"lat": fl.geography.lat, "lng": fl.geography.lng}
    latlong.push(x);
  }
}

function initMap() {

  console.log(latlong)
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {lat: 39.742043, lng: -81.4183}
  });

        // Create an array of alphabetical characters used to label the markers.

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
var markers = latlong.map(function(location, i) {
  return new google.maps.Marker({
    position: location,
    label: "HHHHHHHHHH"
  });
});

        // Add a marker clusterer to manage the markers.
var markerCluster = new MarkerClusterer(map, markers,
  {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

} // end initMap()
