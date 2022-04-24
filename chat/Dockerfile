# FROM node:12.14.1-alpine as dev-env
# WORKDIR /app
# COPY . /app
# RUN apk update
# RUN yarn
# EXPOSE 3000
# CMD ["yarn", "dev"]

FROM node:12.14.1-alpine as build-env
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM node:10.16.1-alpine

WORKDIR /app
COPY . /app

# 別のビルドから成果物をコピー可能
COPY --from=build-env /app/.nuxt /app/.nuxt

# 本番では devDeps を消してファイルサイズを削減
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]