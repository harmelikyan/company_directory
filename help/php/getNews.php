
<?php
// $country_name = urlencode($_GET['countryName']);
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$data = file_get_contents('http://newsapi.org/v2/everything?q='.$lat. $lng . '&sortBy=relevancy&apiKey=c196d2e348644b668ecfe80c1af6e7a8');
print_r($data);
?>