<?php

    $url = file_get_contents("countryBorders.geo.json");
    $json = json_decode($url);
    $features = $json->features;

    $country_borders = [];
    for($i = 0; $i < count($features); $i++) {
    array_push($country_borders, $features[$i]->geometry);
    }



    echo json_encode($country_borders);


?>

