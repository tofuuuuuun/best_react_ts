<?php
require_once('../token/tmdbToken.php');

header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost'); // 特定のオリジンを許可
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // 許可するHTTPメソッド
header('Access-Control-Allow-Headers: Content-Type, Authorization');        // 許可するヘッダー

$movieTitle = '';
$movieTitle = isset($_GET['movieTitle']) ? urldecode($_GET['movieTitle']) : '';

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.themoviedb.org/3/search/movie?query={$movieTitle}&include_adult=false&language=ja-JA&region=JA&page=1",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Authorization: " . TMDB_TOKEN,
        "accept: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo ["error" => "cURL Error #:" . $err];
} else {
    echo $response;
}

exit;
