<?php
header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost,https://dev.rahi-lab.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$tmdbToken = getenv('TMDB_API_KEY');

$pageArray = array();
for ($i = 1; $i <= 5; $i++) {
    array_push($pageArray, rand(1, 20));
}

$dateHour = new DateTime('now');
$dateHour = $dateHour->format('YmdH');
$cacheKey = "movieTopRate_" . $dateHour;

$cachedResult = apcu_fetch($cacheKey);
if ($cachedResult) {
    echo json_encode($cachedResult);
    exit;
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
            "Authorization: " . $tmdbToken,
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
$posterData = [];
foreach ($apiResults as $key => $value) {
    $tmpValue = json_decode($value, true);
    foreach ($tmpValue['results'] as $movie) {
        if (isset($movie['id']) && isset($movie['poster_path'])) {
            $posterData[] = [
                'id' => $movie['id'],
                'poster_path' => $movie['poster_path']
            ];
        }
    }
}

apcu_store($cacheKey, $posterData, 3600);

if ($err) {
    echo ["error" => "cURL Error #:" . $err];
} else {
    echo json_encode($posterData);
}
exit;
