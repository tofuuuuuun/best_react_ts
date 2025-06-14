<?php
if (!isset($_GET['url'])) {
    http_response_code(400);
    exit('No url specified');
}
$url = $_GET['url'];
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$data = curl_exec($ch);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

header('Content-Type: ' . ($contentType ?: 'image/jpeg'));
header('Access-Control-Allow-Origin: *'); // CORSヘッダー
echo $data;
