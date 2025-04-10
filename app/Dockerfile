
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
COPY --from=builder /home/node/app/frontend/dist /usr/share/nginx/html

# Nginx設定のカスタマイズ
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# SSL証明書をコピー
COPY ./certs /etc/nginx/certs

# ポートの公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]