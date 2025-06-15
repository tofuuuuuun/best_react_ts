<?php
header('Content-type: application/json; charset=utf-8;');
header('Access-Control-Allow-Origin: http://localhost,https://dev.rahi-lab.com,,https://rahi-lab.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$file = '/var/www/html/topMovieImage.json';

if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'not found']);
}
exit;
