<?php
$lat = $_GET['lat'];
$long = $_GET['lng'];
$countryName = $_GET['country_code'];
$data = file_get_contents('https://disease.sh/v3/covid-19/countries/$countryName?yesterday&strict&query');
print_r($data);
?>



