<?php
$clientId = getenv('SPOTIFY_CLIENT_ID');
$clientSecret = getenv('SPOTIFY_CLIENT_SECRET');
$cacheKey = 'spotify_access_token';
$cacheExpiryKey = 'spotify_access_token_expiry';

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

$expiresIn = "";
$expiryTime = 0;

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $responseArray = json_decode($response, true);
    $accessToken = $responseArray['access_token'];
    $expiresIn = $responseArray['expires_in'];
    $expiryTime = $currentTime + $expiresIn;
}

apcu_store($cacheKey, $accessToken, 3600);

return $accessToken;
