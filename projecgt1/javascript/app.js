//preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});

var countryCodeGlobal = "";
var lat;
var lng;
var countryBoundary;
var map;
var citiesMarker;
var wikiMarker;

$(document).ready(function () {
map = L.map("issMap", {
  attributionControl: false,
}).setView([0, 0], 1.5);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(map)


 countryBoundary = new L.geoJson().addTo(map);

 citiesMarker = L.markerClusterGroup();
 map.addLayer(citiesMarker);

wikiMarker = L.markerClusterGroup();
map.addLayer(wikiMarker);

 getCountry();
 getUserLocation();

});



$("#weather").click(function() {
  if($("#countries").val() === "") {
    $("#weather-table").hide();
  } 
  else {
  $("#weather-table").show();
  }
})

$("#closeButton").click(function() {
  $("#weather-table").hide();
})

$(function() {
  $("#down").click(function() {
    if($("#up").css("display") === "none") {
      $("#up").css("display", "block");
      $("#down").hide();
      $(".table-close").fadeOut();
    } else {
      $("#up").hide();
    }
  })
})

$(function() {
  $("#up").click(function() {
    if($("#down").css("display") === "none") {
      $("#down").css("display", "block");
      $("#up").hide();
      $(".table-close").show();
    } else {
      $("#down").hide();
    }
  })
})




// countryName
function getCountry() {
  $.ajax({
    url: 'php/getCountriesCode.php',
    type: 'GET',
    dataType: 'json',
    
    success: function(result) {
      // console.log(result)

      for(var country of result) {
       var countNames =  $('#countries').append(`<option value="${country["iso_a2"]}">${country["name"]}</option>`);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }  
  })
}


function getUserLocation() {
  console.log("inside get user location");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const {
          latitude
        } = position.coords;
        const {
          longitude
        } = position.coords;
        const coords = [latitude, longitude];
        $.ajax({
          url: "php/getLatLong.php?lat=" +
            latitude +
            "&lng=" +
            longitude +
            "&username=harmelikyan",
          type: "GET",
          success: function (json) {
            console.log("json: ", json);
            json = JSON.parse(json); 
            const country_code = json.countryCode;
            $("#countries").val(country_code.toUpperCase()).change();
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(jqXHR);
          }
        });
      },
    )
  }
}


  //country border
  function getCountryBorder(countryCode) {
    $.ajax({
      url: 'php/getCountryBorders.php',
      type: 'GET',
      dataType: 'json', 
      data: {
          countryCode: $('#countries').val(),

      },
      
      success: function(json) {
        console.log(JSON.stringify(json))
        countryBoundary.clearLayers();
        countryBoundary.addData(json).setStyle(countryStyle());
        const bounds = countryBoundary.getBounds();
        map.fitBounds(bounds);


        const east = bounds.getEast();
        const west = bounds.getWest();
        const north = bounds.getNorth();
        const south = bounds.getSouth();
        ;
        getNearbyCities(east, west, north, south);
        getNearbyWikis(east, west, north, south);

 },

      error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(jqXHR);
      }
            
    })
    
  }

function countryStyle() {
  return {
    fillColor: "blue",
    weight: 2,
    fillOpacity: 0.6,

  }
}


function locateCountry(countryCode) {
  if (countryCode == "") return;
  country_name = $("#country option:selected").text();
  countryCodeGlobal = countryCode;
  getCountryBorder(countryCode);
  getCountryInfo(countryCode);
}

//get nearby cities and put markers
function getNearbyCities(east, west, north, south) {
  citiesMarker.clearLayers();
  $.ajax({
    url: "php/getCitiesNearby.php",
    type: "GET",
    data: {
      east: east,
      west: west,
      north: north,
      south: south,
      username: "harmelikyan",
    },
    success: function (json) {
      json = JSON.parse(json);
      console.log(json);
      const data = json.geonames;
      const city_icon = L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        markerColor: 'red',
        shape: 'circle',
        prefix: 'fa'
      });

      for (let i = 0; i < data.length; i++) {
        const marker = L.marker([data[i].lat, data[i].lng], {
          icon: city_icon,
        }).bindPopup(
          "<b>" +
          data[i].name +
          "</b><br>Population: " +
          parseInt(data[i].population).toLocaleString("en")
          
        );
        
        citiesMarker.addLayer(marker);
        
      }
    },
  });
}

//get nearby wikipedias
function getNearbyWikis(east, west, north, south) {
  wikiMarker.clearLayers();
  $.ajax({
    url: "php/getWikipedia.php",
    type: "GET",
    data: {
      east: east,
      west: west,
      north: north,
      south: south,
      username: "harmelikyan",
    },
    success: function (json) {
      json = JSON.parse(json);
      console.log(json);
      const data = json.geonames;
      const wiki_icon = L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        markerColor: 'blue',
        shape: 'circle',
        prefix: 'fa'
      });
      for (let i = 0; i < data.length; i++) {
        const marker = L.marker([data[i].lat, data[i].lng], {
          icon: wiki_icon,
        }).bindPopup(
          data[i].title +
          "</b><br><a href='https://" +
          data[i].wikipediaUrl +
          "' target='_blank'>Wikipedia Link</a>"
        );
        wikiMarker.addLayer(marker);
      }
    },
  });
}


//get country info
function getCountryInfo(countryCode) {

  $.ajax({
    url: "php/getCountryInfo.php",
    type: "GET",
    data: {
      country_code: countryCode
    },
    success: function (response) {
      let info = JSON.parse(response);
      console.log(info);
      lat = info.latlng[0];
      lng = info.latlng[1];
            $("#country_capital").html(info.capital);
            $("#country_population").html(info.population);
            $("#country_flag").attr("src", info.flag);
            $("#country_currency").html(info.currencies[0]["name"]);
            $("#region").html(info.region);
            $("#timeZone").html(info.timezones);
            $("#countryWikipedia").attr(
              "href",
              "https://en.wikipedia.org/wiki/" + info.name
            );
    },
  });
}


    

//Weather data
function getWeatherData() {
  $.ajax({
    url: "php/getWeather.php",
    type: "GET",
    datatype: 'json',
    data: {
      lat: lat,
      lng: lng
    },
    success: function (response) {
      let details = JSON.parse(response);
      console.log(details);
      $("#first-row").html("Weather for the next Seven Days");
      $("#second-row").html("Max Temperature");
      $("#third-row").html("Min Temperature");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (let i = 0; i < 7; i++) {
        const d = details["daily"][i];
        const day = days[new Date(d["dt"] * 1000).getDay()];
        $("#first-row").append("<td>" + day + "</td>");
        $("#second-row").append("<td>" + parseInt(d["temp"]["max"]) + "°</td>");
        $("#third-row").append("<td>" + parseInt(d["temp"]["min"]) + "°</td>");
        const wiki_icon = L.ExtraMarkers.icon({
          icon: 'fa-coffee',
          markerColor: 'blue',
          shape: 'circle',
          prefix: 'fa'
        });
        for (let i = 0; i < data.length; i++) {
          const marker = L.marker([data[i].lat, data[i].lng], {
            icon: wiki_icon,
          }).bindPopup(
            data[i].title +
            "</b><br><a href='https://" +
            data[i].wikipediaUrl +
            "' target='_blank'>Wikipedia Link</a>"
          );
          wikiMarker.addLayer(marker);
        }
      }
    },
  });
}







