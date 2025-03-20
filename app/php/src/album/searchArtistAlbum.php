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
$type = $_GET['type'] ?? "";
$artistId = $_GET['artistId'] ?? "";
$cacheKey = "";
$cachedResult = "";
$cacheKey = "artist_albums_" . ($artistId ?: md5($artistName)) . "_" . ($type ?: 'all');

// 戻り値を格納する
$allItems = [];

// キャッシュに一致するデータが有れば返す
$cachedResult = apcu_fetch($cacheKey);
if ($cachedResult) {
    echo json_encode($cachedResult);
    exit;
}

// allでない場合はtypeで指定した形式を取得する
if ($type != "all") {
    $includeGroups = "include_groups={$type}";
} else {
    $includeGroups = "include_groups=single,album,compilation,appears_on";
}

$includeGroups = "include_groups=single,album,compilation";

// artistIdを使用してアルバム情報を取得する
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/artists/{$artistId}/albums?{$includeGroups}&market=JP&limit=50",
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
curl_close($curl);

$allItems = array_merge($allItems, $responseArray['items']);

// 取得した情報が50件以上ある場合、続きを取得していく
if (isset($responseArray['next']) && $responseArray['next']) {
    $resultFlg = true;
    for ($i = 1; $resultFlg == true;) {
        $offset = 50;
        $nextOffset = "offset=" . $offset * $i;

        if ($type != "all") {
            $includeGroups = "include_groups={$type}";
        } else {
            $includeGroups = "include_groups=single,album,compilation,appears_on";
        }

        $includeGroups = "include_groups=single,album,compilation";

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.spotify.com/v1/artists/{$artistId}/albums?{$includeGroups}&market=JP&{$nextOffset}&limit=50",
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
        curl_close($curl);

        if (isset($responseArray['items'])) {
            $allItems = array_merge($allItems, $responseArray['items']);
        }

        if (!$responseArray['next']) {
            $resultFlg = false;
        } else {
            $resultFlg = true;
            sleep(1);
        }
        $i++;
    }
}

apcu_store($cacheKey, $allItems, 300);

echo json_encode($allItems);
exit;
