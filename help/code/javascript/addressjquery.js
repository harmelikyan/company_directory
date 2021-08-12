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
        $('#houseNum').html(result['data'][0]['houseNumber']);
        $('#localty').html(result['data'][0]['locality']);
        $('#adminName2').html(result['data'][0]['adminName2']);
        $('#street').html(result['data'][0]['street']);
        $('#postal').html(result['data'][0]['postalcode']);
      }
    },
  })
})
