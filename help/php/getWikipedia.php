<?php

$east = $_GET['east'];
$west = $_GET['west'];
$north = $_GET['north'];
$south = $_GET['south'];
$username = $_GET['username'];
$data = file_get_contents("http://api.geonames.org/wikipediaBoundingBoxJSON?north=$north&south=$south&east=$east&west=$west&username=$username");
print_r($data);
?>