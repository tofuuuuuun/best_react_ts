<?php
$images = fetch_movie_images_from_api();

// ファイルに保存
file_put_contents('/var/www/html/topMovieImage.json', json_encode($images, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

function fetch_movie_images_from_api()
{
    // tokenを取得
    $tmdbToken = getenv('TMDB_API_KEY');

    $pageArray = array();
    for ($i = 1; $i <= 5; $i++) {
        array_push($pageArray, rand(1, 20));
    }

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

        // エラーが発生した場合はエラーメッセージを格納
        // TODO: エラー時の処理を改善する。ログに出力するなど。
        if ($err) {
            $apiResults[] = ["error" => "cURL Error #:" . $err];
        } else {
            $apiResults[] = $response;
        }
    }
    curl_close($curl);

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
    return $posterData;
}
