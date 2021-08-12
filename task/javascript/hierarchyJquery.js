// preloader
$(window).on('load', function() {
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function() {
      $(this).remove();
    });
  }
});




$('#button2').on('click', function() {
  // submit button hide/show
  $("#toggle1").toggle();
  // change submit button text on click
  $('#button2').text(function(i, text) {
    return text === "Submit" ? "Clear" : "Submit";
  })


  $.ajax({
    url: 'php/hierarchy.php',
    type: 'POST',
    dataType: 'json',
    success: function(result) {

      console.log(JSON.stringify(result));



      if (result.status.name == 'ok') {
        $('#lng5').html(result['data'][0]['lng']);
        $('#geonameId5').html(result['data'][0]['geonameId']);
        $('#name5').html(result['data'][0]['name']);
        $('#fclName5').html(result['data'][0]['fclName']);
        $('#toponymName5').html(result['data'][0]['toponymName']);
        $('#fcodeName5').html(result['data'][0]['fcodeName']);
        $('#lat5').html(result['data'][0]['lat']);
        $('#fcl5').html(result['data'][0]['fcl']);
        $('#fCode5').html(result['data'][0]['fcode']);
        $('#pop5').html(result['data'][0]['population']);

        $('#lng6').html(result['data'][1]['lng']);
        $('#geonameId6').html(result['data'][1]['geonameId']);
        $('#name6').html(result['data'][1]['name']);
        $('#fclName6').html(result['data'][1]['fclName']);
        $('#toponymName6').html(result['data'][1]['toponymName']);
        $('#fcodeName6').html(result['data'][1]['fcodeName']);
        $('#lat6').html(result['data'][1]['lat']);
        $('#fcl6').html(result['data'][1]['fcl']);
        $('#fCode6').html(result['data'][1]['fcode']);
        $('#pop6').html(result['data'][1]['population']);

        $('#lng7').html(result['data'][2]['lng']);
        $('#geonameId7').html(result['data'][2]['geonameId']);
        $('#name7').html(result['data'][2]['name']);
        $('#fclName7').html(result['data'][2]['fclName']);
        $('#toponymName7').html(result['data'][2]['toponymName']);
        $('#fcodeName7').html(result['data'][2]['fcodeName']);
        $('#lat7').html(result['data'][2]['lat']);
        $('#fcl7').html(result['data'][2]['fcl']);
        $('#fCode7').html(result['data'][2]['fcode']);
        $('#pop7').html(result['data'][2]['population']);

        $('#lng8').html(result['data'][3]['lng']);
        $('#geonameId8').html(result['data'][3]['geonameId']);
        $('#name8').html(result['data'][3]['name']);
        $('#fclName8').html(result['data'][3]['fclName']);
        $('#toponymName8').html(result['data'][3]['toponymName']);
        $('#fcodeName8').html(result['data'][3]['fcodeName']);
        $('#lat8').html(result['data'][3]['lat']);
        $('#fcl8').html(result['data'][3]['fcl']);
        $('#fCode8').html(result['data'][3]['fcode']);
        $('#pop8').html(result['data'][3]['population']);

        $('#lng9').html(result['data'][4]['lng']);
        $('#geonameId9').html(result['data'][4]['geonameId']);
        $('#name9').html(result['data'][4]['name']);
        $('#fclName9').html(result['data'][4]['fclName']);
        $('#toponymName9').html(result['data'][4]['toponymName']);
        $('#fcodeName9').html(result['data'][4]['fcodeName']);
        $('#lat9').html(result['data'][4]['lat']);
        $('#fcl9').html(result['data'][4]['fcl']);
        $('#fCode9').html(result['data'][4]['fcode']);
        $('#pop9').html(result['data'][4]['population']);









      }
    },
  })
})
