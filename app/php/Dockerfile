# #####
# Backend
# #####

FROM php:8.1-fpm AS php-stage

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip

# zip拡張をインストール
RUN docker-php-ext-install zip

# apcuをインストールして有効化
RUN pecl install apcu && docker-php-ext-enable apcu
RUN echo "extension=apcu.so" > /usr/local/etc/php/conf.d/docker-php-ext-apcu.ini
RUN echo "apc.enable_cli=1" >> /usr/local/etc/php/conf.d/docker-php-ext-apcu.ini

# Composerをコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHP設定ファイルをコピー（必要に応じて）
COPY ./php.ini /usr/local/etc/php/

# ソースコードをコピー
COPY ./src /var/www/html