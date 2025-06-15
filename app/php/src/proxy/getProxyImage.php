<?php
// 許可するドメインリスト
$allowed_domains = [
    'image.tmdb.org',
    // 必要なら他のドメインも追加
];

if (!isset($_GET['url'])) {
    http_response_code(400);
    exit('No url specified');
}

$url = $_GET['url'];

// ホスト名を抽出して許可リストと照合
$host = parse_url($url, PHP_URL_HOST);
if (!in_array($host, $allowed_domains, true)) {
    http_response_code(403);
    exit('Forbidden domain');
}

// ディレクトリトラバーサル防止（念のため）
if (strpos($url, '..') !== false) {
    http_response_code(400);
    exit('Invalid path');
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$data = curl_exec($ch);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

// セキュリティヘッダー
header('Content-Type: ' . ($contentType ?: 'image/jpeg'));
header('Access-Control-Allow-Origin: *');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

echo $data;
