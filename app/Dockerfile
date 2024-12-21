ARG NODE_VER=20-slim
FROM node:${NODE_VER} AS builder

WORKDIR /home/node/app
RUN mkdir node_modules

# パッケージインストールとソースコードのコピー
COPY ./frontend/package.json ./
RUN yarn install
COPY ./frontend ./

# Viteでビルド
RUN yarn build

FROM nginx:alpine
# ビルドされた静的ファイルをNginxの配信フォルダへコピー
COPY --from=builder /home/node/app/dist /usr/share/nginx/html

# カスタムのNginx設定を適用
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# SSL証明書のコピー
COPY ./certs /etc/nginx/certs

# favicon.icoのコピー
COPY ./frontend/public/favicon.ico /usr/share/nginx/html/

# ポートの公開
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
