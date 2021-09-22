
<?php


$lat = $_GET['lat'];
$lng = $_GET['lng'];
$countryName = $_GET['countryCodeGlobal'];
$current_date = date("Y-m-d");
$data = file_get_contents('http://newsapi.org/v2/everything?q=' . $countryName . '&from=' . $current_date . '&sortBy=relevancy&apiKey=c196d2e348644b668ecfe80c1af6e7a8');
print_r($data);
?>