# #####
# Frontend
# #####

# Node.jsのビルダーイメージ
ARG NODE_VER=22
FROM node:${NODE_VER}-bookworm-slim AS builder

WORKDIR /home/node/app/frontend

# パッケージインストール
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# 環境変数ファイルをコピー
ARG ENV_FILE=.env
COPY ${ENV_FILE} .env

# ソースコードをコピー
COPY ./frontend/ ./

# Viteでビルド
RUN yarn build

# Nginxで静的ファイルを配信
FROM nginx:stable-alpine

# ビルド成果物をコピー
COPY --from=builder /home/node/app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]