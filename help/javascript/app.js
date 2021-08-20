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
          countryCode: countryCode
      },
      
      success: function(result) {
      //  console.log (JSON.stringify(json))
        countryBoundary.clearLayers();
        countryBoundary.addData(result).setStyle(countryStyle());
        const bounds = countryBoundary.getBounds();
        map.fitBounds(bounds);
 },

      error: function(jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(jqXHR);
      }
            
    })
    
  }
  getCountryBorder();


  

function countryStyle() {
  return {
    fillColor: "blue",
    weight: 2,
    fillOpacity: 0.6,

  }
}



var latlang = [[[23.75975, -77.53466],[23.71, -77.78],[24.28615, -78.03405],[24.57564, -78.40848],[25.2103, -78.19087],[25.17, -77.89],[24.34, -77.54],[23.75975, -77.53466]]];
// Creating poly line options
var polyLineOptions = {color:'red'};
// Creating multi poly-lines
var polyline = L.polyline(latlang , polyLineOptions);
// Adding multi poly-line to map
map.fitBounds(polyline.getBounds());
polyline.addTo(map);

