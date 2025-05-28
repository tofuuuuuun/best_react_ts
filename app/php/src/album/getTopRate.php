<?php
header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *'); // 特定のオリジンを許可
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // 許可するHTTPメソッド
header('Access-Control-Allow-Headers: Content-Type, Authorization');        // 許可するヘッダー

require_once('../token/spotifyToken.php');

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // プリフライトリクエストを終了
}

$dateHour = new DateTime('now');
$dateHour = $dateHour->format('YmdH');
$cacheKey = "albumTopRate_" . $dateHour;

$cachedResult = apcu_fetch($cacheKey);
if ($cachedResult) {
    echo json_encode($cachedResult);
    exit;
}

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/search?q=japan+top+50&type=playlist&market=JP&limit=5&offset=0",
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
$responseArray = json_decode($response, true);
$playlistId = $responseArray['playlists']['items'][4]['id'];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/playlists/{$playlistId}/tracks?fields=items%28track%28album%28images%28url%29%29%29",
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
$err = curl_error($curl);

if ($err) {
    echo json_encode(["error" => "cURL Error #:" . $err]);
    exit;
}

// レスポンスを配列に変換
$responseArray = json_decode($response, true);

// 画像URLを取得
$imageUrls = [];
if (isset($responseArray['items'])) {
    foreach ($responseArray['items'] as $item) {
        if (isset($item['track']['album']['images'][1]['url'])) {
            $imageUrls[] = $item['track']['album']['images'][1]['url'];
        }
    }
}

apcu_store($cacheKey, $imageUrls, 3600);

echo json_encode($imageUrls);

exit;
