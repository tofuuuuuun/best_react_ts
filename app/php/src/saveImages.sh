#!/bin/sh
while true; do
  php /var/www/html/movie/saveTopMovieImage.php
  php /var/www/html/album/saveTopAlbumImage.php
  sleep 3600
done