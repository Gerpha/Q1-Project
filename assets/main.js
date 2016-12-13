var latt = []
var long = []

$(document).ready(function () {
  getFlights()

  $("#btn1").click(function () {
    event.preventDefault()
    var $title = $("input[name=search]")
    var names = $title.val()
    $title.val('')
    getAirline(names)
    getAirports(names)
  })
})

function getAirline(names) {
  $.get("https://iatacodes.org/api/v6/airlines?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airline) {
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
  $.get("https://iatacodes.org/api/v6/airports?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airport) {
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
  $.get("https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796", function(flights) {
    $(".flights").html("")
    displayFlights(flights)
  })
}

function displayFlights(data) {
  for (var i = 0; i < data.response.length; i++) {
    var fl = data.response[i]
    latt.push(fl.geography.lat)
    long.push(fl.geography.lng)
  }
}
console.log(latt)
console.log(long)

function initMap() {
  // for (var i = 0; i < latt.length; i++) {
  //   var lit = latt[i]
  // }
  // for (var j = 0; j < long.length; j++) {
  //   var lot = long[j]
  // }
  var uluru = {lat: 39.742043, lng: -104.991531};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
