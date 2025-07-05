<?php
$clientId = getenv('SPOTIFY_CLIENT_ID');
$clientSecret = getenv('SPOTIFY_CLIENT_SECRET');
$cacheKey = 'spotify_access_token';
$cacheExpiryKey = 'spotify_access_token_expiry';

error_log('clientId: ' . print_r($clientId, true) . PHP_EOL, 3, '/var/www/html/debug.log');
error_log('clientSecret: ' . print_r($clientSecret, true) . PHP_EOL, 3, '/var/www/html/debug.log');


$accessToken = array();
$accessToken = apcu_fetch($cacheKey);
if ($accessToken) {
    return $accessToken;
}

$currentTime = time();

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://accounts.spotify.com/api/token",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => "grant_type=client_credentials",
    CURLOPT_HTTPHEADER => [
        "Authorization: Basic " . base64_encode($clientId . ":" . $clientSecret),
        "Content-Type: application/x-www-form-urlencoded"
    ],
]);
$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $responseArray = json_decode($response, true);
    $accessToken = isset($responseArray['access_token']) ? $responseArray['access_token'] : $cacheKey;
    $expiresIn = isset($responseArray['expires_in']) ? $responseArray['expires_in'] : "3600";
    $expiryTime = $currentTime + $expiresIn;
}

apcu_store($cacheKey, $accessToken, 3600);

return $accessToken;
