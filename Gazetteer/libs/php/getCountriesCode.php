<?php
 
    $url = file_get_contents("/Users/harmelikyan/.bitnami/stackman/machines/xampp/volumes/root/htdocs/gazetteer Right structer/vendors/countryBorders.geo.json");
    $json = json_decode($url);
    $features = $json->features;
 
    $countries = [];
    for($i = 0; $i < count($features); $i++) {
        
     array_push($countries, $features[$i]->properties);
    }
     sort($countries);
    echo json_encode($countries);
 
?>

