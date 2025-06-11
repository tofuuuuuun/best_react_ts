
# #####
# 環境構築用
# #####
# ARG NODE_VER
# FROM node:${NODE_VER}

# USER node
# WORKDIR /home/node/app

# #####
# Frontend
# #####

# Node.js のビルダーイメージ
ARG NODE_VER=20
FROM node:${NODE_VER} AS builder

WORKDIR /home/node/app/frontend

# 必要なディレクトリとパスの準備
RUN mkdir node_modules

# パッケージインストールとソースコードのコピー
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install

# 証明書とNginxの設定ファイルをコピー
COPY ./frontend/nginx.test.conf /etc/nginx/conf.d/default.conf
COPY /etc/ssl/certs/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY /etc/ssl/private/letsencrypt33366955.key /etc/nginx/certs/letsencrypt33366955.key:ro
COPY /home/deploy_user/.htpasswd /etc/nginx/htpasswd


# 環境変数ファイルをコピー
ARG ENV_FILE=.env
COPY ${ENV_FILE} .env

# ソースコードのコピー
COPY ./frontend ./ 

# Viteでビルド
RUN yarn build

# Nginxイメージを利用して静的ファイルを配信
FROM nginx:alpine

# ビルド成果物をNginxの配信ディレクトリにコピー
COPY --from=builder /home/node/app/frontend/dist /var/www/html

# ポートの公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]