//preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});




$('#button').on('click', function() {
  // submit button hide/show
  $("#toggle").toggle();
  // change submit button text on click
  $('#button').text(function(i, text) {
    return text === "Submit" ? "Clear" : "Submit";
  })

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
