// preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});




$('#button3').on('click', function() {
  // submit button hide/show
  $("#toggle2").toggle();
  // change submit button text on click
  $('#button3').text(function(i, text) {
    return text === "Submit" ? "Clear" : "Submit";
  })




  $.ajax({
    url: 'php/children.php',
    type: 'POST',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));



      if (result.status.name == 'ok') {
        $('#lng0').html(result['data'][0]['lng']);
        $('#geonameId0').html(result['data'][0]['geonameId']);
        $('#toponymName0').html(result['data'][0]['toponymName']);
        $('#countryId0').html(result['data'][0]['countryId']);
        $('#fcl0').html(result['data'][0]['fcl']);
        $('#population0').html(result['data'][0]['population']);
        $('#countryCode0').html(result['data'][0]['countryCode']);
        $('#fclName0').html(result['data'][0]['fclName']);
        $('#countryName0').html(result['data'][0]['countryName']);
        $('#fcodeName0').html(result['data'][0]['fcodeName']);
        $('#lat0').html(result['data'][0]['lat']);

        $('#lng01').html(result['data'][1]['lng']);
        $('#geonameId01').html(result['data'][1]['geonameId']);
        $('#toponymName01').html(result['data'][1]['toponymName']);
        $('#countryId01').html(result['data'][1]['countryId']);
        $('#fcl01').html(result['data'][1]['fcl']);
        $('#population01').html(result['data'][1]['population']);
        $('#countryCode01').html(result['data'][1]['countryCode']);
        $('#name01').html(result['data'][1]['name']);
        $('#fclName01').html(result['data'][1]['fclName']);
        $('#countryName01').html(result['data'][1]['countryName']);
        $('#fcodeName01').html(result['data'][1]['fcodeName']);
        $('#lat01').html(result['data'][1]['lat']);

        $('#lng02').html(result['data'][2]['lng']);
        $('#geonameId02').html(result['data'][2]['geonameId']);
        $('#toponymName02').html(result['data'][2]['toponymName']);
        $('#countryId02').html(result['data'][2]['countryId']);
        $('#fcl02').html(result['data'][2]['fcl']);
        $('#population02').html(result['data'][2]['population']);
        $('#countryCode02').html(result['data'][2]['countryCode']);
        $('#name02').html(result['data'][2]['name']);
        $('#fclName02').html(result['data'][2]['fclName']);
        $('#countryName02').html(result['data'][2]['countryName']);
        $('#fcodeName02').html(result['data'][2]['fcodeName']);
        $('#lat02').html(result['data'][2]['lat']);

        $('#lng03').html(result['data'][3]['lng']);
        $('#geonameId03').html(result['data'][3]['geonameId']);
        $('#toponymName03').html(result['data'][3]['toponymName']);
        $('#countryId03').html(result['data'][3]['countryId']);
        $('#fcl03').html(result['data'][3]['fcl']);
        $('#population03').html(result['data'][3]['population']);
        $('#countryCode03').html(result['data'][3]['countryCode']);
        $('#name03').html(result['data'][3]['name']);
        $('#fclName03').html(result['data'][3]['fclName']);
        $('#countryName03').html(result['data'][3]['countryName']);
        $('#fcodeName03').html(result['data'][3]['fcodeName']);
        $('#lat03').html(result['data'][3]['lat']);

        $('#lng04').html(result['data'][4]['lng']);
        $('#geonameId04').html(result['data'][4]['geonameId']);
        $('#toponymName04').html(result['data'][4]['toponymName']);
        $('#countryId04').html(result['data'][4]['countryId']);
        $('#fcl04').html(result['data'][4]['fcl']);
        $('#population04').html(result['data'][4]['population']);
        $('#countryCode04').html(result['data'][4]['countryCode']);
        $('#name04').html(result['data'][4]['name']);
        $('#fclName04').html(result['data'][4]['fclName']);
        $('#countryName04').html(result['data'][4]['countryName']);
        $('#fcodeName04').html(result['data'][4]['fcodeName']);
        $('#lat04').html(result['data'][4]['lat']);









      }
    },
  })
})
