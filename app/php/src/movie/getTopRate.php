<?php
require_once('../token/tmdbToken.php');

header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$pageArray = array();
for ($i = 1; $i <= 5; $i++) {
    array_push($pageArray, rand(1, 20));
}

// APIから取得
$curl = curl_init();
$apiResults = [];
foreach ($pageArray as $page) {
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.themoviedb.org/3/movie/top_rated?language=ja-JA&page={$page}&region=JA",
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

    if ($err) {
        $apiResults[] = ["error" => "cURL Error #:" . $err];
    } else {
        $apiResults[] = $response;
    }
}

curl_close($curl);

// 画像のURLのみを抽出するしてフラットにする
$posterURLs = [];
foreach ($apiResults as $key => $value) {
    $tmpValue = json_decode($value, true);
    $posterURLs[] = array_map(
        function ($topRateMovie) {
            return $topRateMovie['poster_path'];
        },
        $tmpValue['results']
    );
}
$flatPosterURLs = [];
for ($i = 0; $i < count($posterURLs); $i++) {
    foreach ($posterURLs[$i] as $key => $value) {
        $flatPosterURLs[] = $value;
    }
}

if ($err) {
    echo ["error" => "cURL Error #:" . $err];
} else {
    print_r($flatPosterURLs);
    echo $flatPosterURLs;
}
exit;
