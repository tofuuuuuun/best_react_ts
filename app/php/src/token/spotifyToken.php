<?
$clientId = 'your_client_id';
$clientSecret = 'your_client_secret';

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

$accessToken = '';

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $responseArray = json_decode($response, true);
    $accessToken = $responseArray['access_token'];
    $tokenType = $responseArray['token_type'];
    $expiresIn = $responseArray['expires_in'];
}


echo $accessToken;
