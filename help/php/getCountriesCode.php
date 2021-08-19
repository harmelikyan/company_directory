<?php

    $url = file_get_contents("countryBorders.geo.json");
    $json = json_decode($url);
    $features = $json->features;

    $country_borders = array();
    for($i = 0; $i < sizeof($features); $i++) {
        $feature = $features[$i];
        $country_border = $feature->properties->geometry;
        array_push($country_borders, $array);
    }



    print_r(json_encode($country_borders));


?>
