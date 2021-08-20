var country_code_global;
var lat;
var lng;
const map = L.map('issMap').fitWorld();
map.locate({setView: true, maxZoom: 16});

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
var countryBoundary = new L.geoJson().addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);



//   countryName
function getCountry() {
    $.ajax({
      url: 'php/getCountriesCode.php',
      type: 'GET',
      dataType: 'json',
      
      success: function(result) {
        console.log(result)
 
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
  getCountry();

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
  country_code_global = countryCode;
  getCountryBorder(countryCode);
  getCountryInfo(countryCode);
}

//get country info
function getCountryInfo(countryCode) {
  //animation space
  
  $.ajax({
    url: "php/getCountryInfo.php",
    type: "GET",
    datatype: 'json',
    data: {
       countryCode: countryCode,
    },
    success: function(result) {
      let info = JSON.parse(result);
      console.log(info);
      lat = info.latlng[0];
      lng = info.latlng[1];
      $("#country_capital").html(info.capital);
      $("#country_population").html(info.population);
      $("#country_flag").attr("src", info.flag);
      $("#country_currency").html(info.currencies[0]["name"]);
      $("#region").html(info.region);
      $("#timeZone").html(info.timezones);
       $("#timeZone").html(info.languages[2]["name"]);

    }, 
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  })
}
