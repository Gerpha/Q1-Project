$(document).ready(function () {

  //  $(document).ready(function(){
  //   $('ul.tabs').tabs('select_tab', 'tab_id');
  // });
  //
  // //$("#planes").click(function () {
  //   //event.preventDefault()
  getFlights();
  //addEvent()
  //)}

  // $("#btn1").click(function () {
  //   event.preventDefault()
  //   var $title = $("input[name=search]")
  //   var names = $title.val()
  //   $title.val('')
  //   //getAirports(names)
  //   getAirline(names)
  //
  // })
}) // end document.ready()

var latlong = [];
var map;
var markers;
var image;
var things;
var content = []
// function getAirline(names) {
//   $.getJSON("https://iatacodes.org/api/v6/airlines?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airline) {
//     $(".airline").html("")
//     displayAirlineInfo(airline)
//   })
// }
//
// function displayAirlineInfo(data) {
//     var x = data.response[0]
//     var validData = {}
//     for (var key in x) {
//       if (x[key] !== null) {
//        validData[key] = x[key]
//        var $li = $('<li>')
//        var k = key + ": " + x[key]
//        $li.text(k)
//        $(".airline").append($li)
//       }
//     }
// }
//
// function getAirports(names) {
//   $.getJSON("https://iatacodes.org/api/v6/airports?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airport) {
//     $(".airport").html("")
//     displayAirportInfo(airport)
//   })
// }
//
// function displayAirportInfo(data) {
//   var ap = data.response[0]
//   var apObj = {}
//   for (var key in ap) {
//     if (ap[key] !== null) {
//       apObj[key] = ap[key]
//       var $aplist = $("<li>")
//       var p = key + ": " + ap[key]
//       $aplist.text(p)
//       $(".airport").append($aplist)
//     }
//   }
// }

function getFlights() {
  $.getJSON("https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796", function(flights) {
    localStorage.setItem("bulk-data", flights)
    displayFlights(flights)
  })
}

function displayFlights(data) {
  var contentStrings = []
  for (var i = 0; i < data.response.length; i++) {
    var fl = data.response[i];

    //console.log(fl)

    var spd = fl.speed.horizontal
    var speed = "Speed: " + spd + " mph"
    //console.log(spd)

    var alt = fl.geography.alt
    var altitude = "Altitude: " + alt + " ft"
    //console.log(altitude)

    var dep = fl.departure_code
    var depart = "Departure: " + dep
    //console.log(depart)

    var arr = fl.arrival_code
    var arrive = "Arrival: " + arr
    //console.log(arrive)

    var flt = fl.flight.name
    var flight = "Flight " + flt
    //console.log(flight)

    var call = fl.flight.callsign
    var callsign = "Callsign " + call
    //console.log(callsign)

    var acc = fl.flight.aircraft_code
    var acode = "Aircraft type: " + acc
    //console.log(acode)

    var contentString = speed + " " + "<br/>" + altitude + "<br/>" + depart + "<br/>" + arrive + "<br/>" + flight + "<br/>" + callsign + "<br/>" + acode
    contentStrings[i] = contentString

    var x = {"lat": fl.geography.lat, "lng": fl.geography.lng}
    latlong[i] = x;
  }

  image = "http://wfarm1.dataknet.com/static/resources/icons/set53/adcf5980.png";

  markers = latlong.map(function(location, i) {
    var thing =  new google.maps.Marker({
      position: location,
      map: map,
      icon: image
      });

      //console.log(contentStrings)

      var infowindow = new google.maps.InfoWindow({
        content: contentStrings[i]
      });

      thing.addListener('click', function() {
        map.setZoom(6);
        map.setCenter(thing.getPosition());
        infowindow.open(map, thing);
        //infowindow.close()
      });


      return thing;

    });

} // end displayFlights()

// function addEvent(data) {
//   for (var i = 0; i < latlong.length; i++) {
//     var j = latlong[i]
//     console.log(j)
//     // j.click(function () {
//     //   console.log("hey")
//     // })
//   }
// }
//console.log(latlong)

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {lat: 39.742043, lng: -81.4183}
  });
  // map.addListener("click", function (jet) {
  //   console.log(jet)
  // })

} // end initMap()
