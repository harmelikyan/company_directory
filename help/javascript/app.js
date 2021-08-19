//init maps
const map = L.map('issMap').fitWorld();
map.locate({setView: true, maxZoom: 16});

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(map)

map.on('click', onMapClick);


var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);



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



//getting country names
  function get_country() {
    $.ajax({
      url: 'php/getCountriesCode.php',
      type: 'GET',
      dataType: 'json',
      
      success: function(json) {
        // var countries = JSON.parse(json);
        var countries = JSON.stringify(json);
    //    console.log(countries)

        var output = "";
        for(var country of countries) {
            output +=
            '<option value="' + country[1] + '">' + country[0] + "</option>";
        }
        $('#countries').html(output);
      },
      error: function(jqXHR, textStatus, errorThrown) {
				// your error code
			}
            
    })
    
  }
  get_country();
