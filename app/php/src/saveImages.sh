#!/bin/sh
while true; do
  echo "start batch" > /tmp/batch.log
  which php >> /tmp/batch.log
  php -v >> /tmp/batch.log
  env >> /tmp/batch.log
  whoami > /tmp/batch.log
  id >> /tmp/batch.log
  ls -ld /var/www/html >> /tmp/batch.log
  ls -l /var/www/html >> /tmp/batch.log
  php /var/www/html/movie/saveTopMovieImage.php >> /tmp/batch.log 2>&1
  php /var/www/html/album/saveTopAlbumImage.php >> /tmp/batch.log 2>&1
  echo "end batch" >> /tmp/batch.log
  sleep 3600
done