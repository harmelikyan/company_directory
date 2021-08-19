<?php

    $url = file_get_contents("countryBorders.geo.json");
    $json = json_decode($url);
    $features = $json->features;

    $countries = [];
    for($i = 0; $i < count($features); $i++) {
        $feature = $features[$i];
        $country_name = $feature->properties->name;
        $country_iso = $feature->properties->iso_a2;
        $array = [$country_name, $country_iso];
        array_push($countries, $features[$i]);
    }



    print_r(json_encode($countries));


?>

