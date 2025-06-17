<?php
require_once('../token/spotifyToken.php');

header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$artistName = $_GET['artistName'] ?? "";

$cacheKey = "artist_name_" . ($artistName ?: md5($artistName));

// キャッシュに一致するデータが有れば返す
$cachedResult = apcu_fetch($cacheKey);
if ($cachedResult) {
    echo json_encode($cachedResult);
    exit;
}

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/search?q={urlencode($artistName)}&type=artist&market=JP&limit=30&offset=0",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $accessToken",
        "accept: application/json"
    ],
]);

$response = curl_exec($curl);
curl_close($curl);

$responseArray = json_decode($response, true);

$filteredArtists = array_map(function ($artist) {
    return [
        'id' => $artist['id'],
        'name' => $artist['name'],
        'images' => $artist['images']
    ];
}, $responseArray['artists']['items'] ?? []);

apcu_store($cacheKey, $filteredArtists, 300);

echo json_encode($filteredArtists);
