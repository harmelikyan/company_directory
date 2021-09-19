<?php
$lat = $_GET['lat'];
$long = $_GET['lng'];
$country_name = $_GET['country_code'];
$data = file_get_contents('https://disease.sh/v3/covid-19/countries/$country_name?yesterday&strict&query');
print_r($data);
?>




