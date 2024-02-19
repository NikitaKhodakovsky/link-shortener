FROM node:20.10.0-alpine as build 

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g turbo

COPY pruned/ui/json .

RUN npm ci --include=dev

COPY turbo.json .

COPY pruned/ui/full .

ARG PUBLIC_URL

ENV PUBLIC_URL=${PUBLIC_URL}

RUN turbo build --filter=ui --no-cache

FROM nginx:1.25.3-alpine as production 

COPY apps/ui/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/ui/build /usr/share/nginx/html
