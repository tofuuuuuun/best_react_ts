#!/bin/sh
echo "start batch" > /tmp/batch.log
which php >> /tmp/batch.log
php -v >> /tmp/batch.log
env >> /tmp/batch.log
php /var/www/html/movie/saveTopMovieImage.php >> /tmp/batch.log 2>&1
php /var/www/html/album/saveTopAlbumImage.php >> /tmp/batch.log 2>&1
echo "end batch" >> /tmp/batch.log