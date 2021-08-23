var countryCodeGlobal = "";
var lat;
var lng;
var countryBoundary;
var map;
$(document).ready(function () {
map = L.map("issMap", {
  attributionControl: false,
}).setView([0, 0], 1.5);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(map)

//shows latlng on click
map.on('click', onMapClick);
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}


map.on('click', onMapClick);

 countryBoundary = new L.geoJson().addTo(map);

 getCountry();
 getUserLocation();

});

//   countryName
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
            json = JSON.parse(json); 
            const country_code = json.countryCode;
            $("#countryCard").val(country_code).trigger("change");
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




//get country info
function getCountryInfo(countryCode) {
  //animation
 

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
      $("#second-row").html("Min temperature");
      $("#third-row").html("Max Temperature");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (let i = 0; i < 7; i++) {
        const d = details["daily"][i];
        const day = days[new Date(d["dt"] * 1000).getDay()];
        $("#first-row").append("<td>" + day + "</td>");
        $("#second-row").append("<td>" + parseInt(d["temp"]["max"]) + "°</td>");
        $("#third-row").append("<td>" + parseInt(d["temp"]["min"]) + "°</td>");
      }
    },
  });
}





