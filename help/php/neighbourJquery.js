//preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});


//Neighbours
$('#button').on('click', function() {
  $.ajax({
    url: 'php/neighbour.php',
    type: 'POST',
    dataType: 'json',
    data: {
      country: $('#selCountry').val()

    },
    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == 'ok') {
        $('#txtPostalCode').html(result['data'][0]['toponymName']);
        $('#txtCountry').html(result['data'][0]['lng']);
        $('#popul').html(result['data'][0]['population']);
        $('#CountryCode').html(result['data'][0]['countryCode']);


        $('#country1').html(result['data'][1]['toponymName']);
        $('#countCode').html(result['data'][1]['lng']);
        $('#pop').html(result['data'][1]['population']);
        $('#geo').html(result['data'][1]['countryCode']);

        $('#country2').html(result['data'][2]['toponymName']);
        $('#txtCountry2').html(result['data'][2]['lng']);
        $('#popul2').html(result['data'][2]['population']);
        $('#CountryCode2').html(result['data'][2]['countryCode']);

        $('#country3').html(result['data'][3]['toponymName']);
        $('#geo3').html(result['data'][3]['lng']);
        $('#pop3').html(result['data'][3]['population']);
        $('#countCode3').html(result['data'][3]['countryCode']);

        $('#country3').html(result['data'][3]['toponymName']);
        $('#geo3').html(result['data'][3]['lng']);
        $('#pop3').html(result['data'][3]['population']);
        $('#countCode3').html(result['data'][3]['countryCode']);

        $('#country4').html(result['data'][4]['toponymName']);
        $('#geo4').html(result['data'][4]['lng']);
        $('#pop4').html(result['data'][4]['population']);
        $('#countCode4').html(result['data'][4]['countryCode']);
      }
    },
  })
})



//Address
$('#button2').on('click', function() {
   $.ajax({
    url: 'php/address.php',
    type: 'POST',
    dataType: 'json',
    data: {
      lat: $('#selLat').val(),
      lng: $('#selLng').val()
    },
    success: function(result) {
      console.log(JSON.stringify(result));
      if (result.status.name == 'ok') {
        $('#houseNum').html(result['data']['houseNumber']);
        $('#localty').html(result['data']['locality']);
        $('#adminName2').html(result['data']['adminName2']);
        $('#street').html(result['data']['street']);
        $('#postal').html(result['data']['postalcode']);
      }
    },
  })
})



//Find nearby points of interest
$('#button3').on('click', function() {
  $.ajax({
   url: 'php/FindNearby.php',
   type: 'POST',
   dataType: 'json',
   data: {
     lat: $('#selLat').val(),
     lng: $('#selLng').val()
   },
   success: function(result) {
     console.log(JSON.stringify(result));
     if (result.status.name == 'ok') {
       $('#latt').html(result['data'][0]['lat']);
       $('#lngg').html(result['data'][0]['lng']);
       $('#distance').html(result['data'][0]['distance']);
       $('#typeClass').html(result['data'][0]['typeClass']);
       
     }
   },
 })
})