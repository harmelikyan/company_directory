$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }});




$('#button').click(function() {    
    $.ajax({
        url: 'php/citiesAndPlacenames.php',
        type: 'POST',
        dataType: 'json',
        data: {
            postal: $('#postalcode').val(),
            country: $('#country').val()
    
                },
        success: function(result) {
            
            console.log(JSON.stringify(result));  
            
            
            
            if (result.postalcodes.status == 'ok') {
                 
                $('#txtPostalCode').html(result['data'][0]['postalcode']);
                $('#txtCountry').html(result['data'][0]['country']);
                
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    })
})