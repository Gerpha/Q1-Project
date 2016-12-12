$(document).ready(function () {

  $("#btn1").click(function () {
    event.preventDefault()
    var $title = $("input[name=search]")
    var names = $title.val()
    $title.val('')
    getData(names)
  })
})

function getData(names) {
  $.get("https://iatacodes.org/api/v6/airlines?api_key=772513cb-42b7-4262-b735-00d2f52eb796&code=" + names, function(airline) {
    displayAirlineInfo(airline)
  })
}

function displayAirlineInfo(data) {
    var x = data.response[0];
    var validData = {}
    for (var key in x) {
      if (x[key] !== null) {
       validData[key] = x[key];
       var $li = $('<li>');
       var k = key + ": " + x[key];
       $li.text(k);
       $(".airline").append($li);
      }
    }
}

// "code": "AF",
//       "name": "Air France",
//       "country_code": "FR",
//       "country_name": "France",
//       "icao": "AFR",
//       "alias": null,
//       "callsign": "AIRFRANS",
//       "account_code": "057",
//       "age": null,
//       "founded": 1933,
//       "phone": "1-800-375-8723",
//       "website": "www.airfrance.fr",
//       "carryon_weight": 10,
//       "carryon_size": "56х36х23",
//       "free_luggage_weight": 0,
//       "on_time_percent": 77,
//       "late_percent": 9,
//       "very_late_percent": 4,
//       "excessive_percent": 7,
//       "canceled_percent": 1,
//       "diverted_percent": 0,
//       "avg_delay": null,
//       "observations": 102589,
//       "min_delay": 0,
//       "max_delay": 967,
//       "status": "active",
//       "type": "scheduled",
//       "city_code": "CDG",
//       "facebook": "https://www.facebook.com/airfrance",
//       "twitter": "https://www.twitter.com/afnewsroom",
//       "wikipedia": "https://en.wikipedia.org/wiki/Air_France"
