<?php
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$data = file_get_contents("https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=$lat&lon=$lng&exclude=current,minutely,hourly,alerts&APPID=04504a1938ffdb3d3aac4fcbd978f355");
print_r($data);
