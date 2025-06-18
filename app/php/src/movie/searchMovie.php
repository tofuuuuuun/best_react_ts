<?php
header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost'); // 特定のオリジンを許可
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // 許可するHTTPメソッド
header('Access-Control-Allow-Headers: Content-Type, Authorization');        // 許可するヘッダー

$tmdbToken = getenv('TMDB_API_KEY');

$cacheKey = "";
$cachedResult = "";
$movieTitle = '';
$movieTitle = isset($_GET['movieTitle']) ? urlencode($_GET['movieTitle']) : '';

print_r("movieTitle: " . $movieTitle . "\n");

$cacheKey = "movieTitle_" . ($movieTitle ?: md5($movieTitle));

// キャッシュに一致するデータが有れば返す
$cachedResult = apcu_fetch($cacheKey);
if ($cachedResult) {
    echo $cachedResult;
    exit;
}

print_r("cachedResult: " . $cachedResult . "\n");

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.themoviedb.org/3/search/movie?query={$movieTitle}&include_adult=false&language=ja-JP&region=JA&page=1",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Authorization: " . $tmdbToken,
        "accept: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
error_log("cURL response: " . $response, 3, '/tmp/batch.log');
curl_close($curl);

if ($err) {
    echo ["error" => "cURL Error #:" . $err];
} else {
    apcu_store($cacheKey, $response, 300);
    echo $response;
}

exit;
