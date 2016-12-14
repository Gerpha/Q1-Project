$(document).ready(function () {

  //$("#planes").click(function () {
    //event.preventDefault()
    getFlights();
  //)}

  $("#btn1").click(function () {
    event.preventDefault()
    var $title = $("input[name=search]")
    var names = $title.val()
    $title.val('')
    getAirports(names)
    getAirline(names)

  })
}) // end document.ready()

var latlong = [];
var map;
var markers;
var image;

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
    localStorage.setItem("bulk-data", flights)
    displayFlights(flights)
  })
}

function displayFlights(data) {
  for (var i = 0; i < data.response.length; i++) {
    var fl = data.response[i];

    //console.log(fl)

    // var speed = fl.speed.horizontal
    // var splist = $("<li>")
    // var spd = "Speed: " + speed + " mph"
    // splist.text(spd)
    // $(".flinfo").append(splist)

    // var alt = fl.geography.alt
    // var altList = $("<li>")
    // var altitude = "Alt: " + alt
    // altList.text(altitude)
    // $(".flinfo").append(altList)
    //
    // var info = fl.flight
    // var infoObj = {}
    // for (var key in info) {
    //   infoObj[key] = info[key]
    //   var infoList = $("<li>")
    //   var inf = key + ": " + info[key]
    //   infoList.text(inf)
    //   $(".flinfo").append(infoList)
    // }


    var x = {"lat": fl.geography.lat, "lng": fl.geography.lng}
    latlong[i] = x;
  }
  image = "http://wfarm1.dataknet.com/static/resources/icons/set53/adcf5980.png";
  markers = latlong.map(function(location) {
    return new google.maps.Marker({
      position: location,
      map: map,
      icon: image
      });
    });
    // google.maps.event.addListener(markers, 'click', function() {
    //   console.log("plane")
    // });
} // end displayFlights()



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {lat: 39.742043, lng: -81.4183}
  });
} // end initMap()
