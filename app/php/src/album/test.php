<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost'); // 特定のオリジンを許可
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // 許可するHTTPメソッド
header('Access-Control-Allow-Headers: Content-Type, Authorization');        // 許可するヘッダー

require_once('../token/spotifyToken.php');

// OPTIONSリクエストの処理
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // プリフライトリクエストを終了
}

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/search?q=q%3D%E6%97%A5%E6%9C%AC%E3%83%88%E3%83%83%E3%83%9750&type=playlist&market=JP&limit=5",
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
$playlistId = $responseArray['playlists']['items'][3]['id'];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.spotify.com/v1/playlists/{$playlistId}/tracks",
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

echo $response;
exit;

if ($err) {
    $apiResults[] = ["error" => "cURL Error #:" . $err];
} else {
    $apiResults[] = $response;
}

exit;
