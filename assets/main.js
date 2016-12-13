$(document).ready(function () {

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

function getFlights(names) {
  $.get("https://iatacodes.org/api/v6/flights?api_key=772513cb-42b7-4262-b735-00d2f52eb796" + names, function(flights) {
    $(".flights").html("")
    displayFlights(flights)
  })
}
//
// function displayFlights(data) {
//
// }
