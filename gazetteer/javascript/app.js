
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



//   countryName to be fixed
function get_country() {
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
  get_country();


// countryName working
//   document.addEventListener('DOMContentLoaded', () => {

//     const selectDrop = document.querySelector('#countries')
    
    
//     fetch('https://restcountries.eu/rest/v2/all').then(res => {
//         return res.json();
//     }).then(countries => {
//         let output = "";
//         countries.forEach(country => {
//             output += `<option>${country.name}</option>`;
           

//         })
    
//         selectDrop.innerHTML = output;
//     }).catch(err => {
//         console.log(err);
//     })
    
    
    
//     })




