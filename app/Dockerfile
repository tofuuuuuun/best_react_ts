# Stage 1: Build the Vite app
ARG NODE_VER=20-slim
FROM node:${NODE_VER} AS builder

# USER node
WORKDIR /home/node/app
RUN mkdir node_modules

# パッケージインストールとソースコードのコピー
COPY ./frontend/package.json ./
# COPY ./frontend/yarn.lock yarn.lock ./
RUN yarn install
COPY ./frontend .

# Viteでビルド
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# ビルドされた静的ファイルをNginxの配信フォルダへコピー
COPY --from=builder /home/node/app/dist /usr/share/nginx/html

# カスタムのNginx設定を適用
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# 必要に応じて証明書をマウント（SSLを使う場合）
COPY ./certs /etc/nginx/certs

COPY ./frontend/public/favicon.ico /usr/share/nginx/html/

# ポートの公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
