<?php
$images = fetch_album_images_from_api();

// ファイルに保存
$result = file_put_contents('/var/www/html/topAlbumImage.json', json_encode($images, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    error_log('Failed to write topAlbumImage.json');
    error_log('Failed to write topAlbumImage.json' . PHP_EOL, 3, '/var/www/html/debug.log');
}

function fetch_album_images_from_api()
{
    require_once(__DIR__ . '/../token/spotifyToken.php');
    error_log('token: ' . print_r($accessToken) . PHP_EOL, 3, '/var/www/html/debug.log');
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.spotify.com/v1/search?q=%E3%83%88%E3%83%83%E3%83%9750%EF%BC%88%E6%97%A5%E6%9C%AC%EF%BC%89&type=playlist&market=JP&limit=1&offset=0",
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

    if (!isset($responseArray['playlists']['items']) || !is_array($responseArray['playlists']['items'])) {
        error_log('Failed to fetch playlists from Spotify API: ' . print_r($responseArray['playlists']['items'], true) . PHP_EOL, 3, '/var/www/html/debug.log');
        return [];
    }

    if (
        !isset($responseArray['playlists']['items']) ||
        !is_array($responseArray['playlists']['items']) ||
        !isset($responseArray['playlists']['items'][0]['id'])
    ) {
        error_log('Spotify API playlists.items[0].id not found: ' . print_r($responseArray, true));
        return [];
    }

    $playlistId = "";
    $playlistId = $responseArray['playlists']['items'][0]['id'];

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.spotify.com/v1/playlists/{$playlistId}/tracks?fields=items%28track%28id%2Calbum%28images%28url%29%29%29",
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
        $apiResults[] = ["error" => "cURL Error #:" . $err];
    } else {
        $apiResults[] = $response;
    }
    curl_close($curl);

    // レスポンスを配列に変換
    $responseArray = json_decode($response, true);

    // 画像URLを取得
    $imageData = [];
    if (isset($responseArray['items'])) {
        foreach ($responseArray['items'] as $item) {
            if (
                isset($item['track']['album']['images'][0]['url']) &&
                isset($item['track']['id'])
            ) {
                $imageData[] = [
                    'id' => $item['track']['id'],
                    'poster_path' => $item['track']['album']['images'][0]['url']
                ];
            }
        }
    }

    return $imageData;
}
