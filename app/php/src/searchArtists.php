<?php
require_once('./spotifyToken.php');

header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173'); // 特定のオリジンを許可
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // 許可するHTTPメソッド
header('Access-Control-Allow-Headers: Content-Type');        // 許可するヘッダー

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // プリフライトリクエストを終了
}
$artistName = $_GET['artistName'] ?? "";

$result = $api->search($artistName, 'artist');
$result = $result->{'artists'};

$workResult = json_decode(json_encode($result), true);

foreach ($workResult['items'] as $key => $value) {
    $delArr = ['external_urls', 'followers', 'genres', 'href', 'popularity', 'type', 'uri'];
    foreach ($delArr as $delKey => $delValue) {
        unset($workResult['items'][$key][$delValue]);
    }
}

echo json_encode($workResult);
exit;
