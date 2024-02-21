# BASE
FROM node:20.10.0-alpine as base 

WORKDIR /app

ENV NODE_ENV=production

ARG SERVICE



# TURBO
FROM base AS turbo

RUN npm i -g turbo



# PRUNE
FROM turbo AS prune

COPY . .

RUN turbo run prune --filter=${SERVICE}



# BUILD
FROM turbo AS build

COPY --from=prune  app/pruned/${SERVICE}/json .

RUN npm ci --include=dev

COPY --from=prune app/pruned/${SERVICE}/full .

COPY tsconfig.json .

ARG PUBLIC_URL

ENV PUBLIC_URL=${PUBLIC_URL}

RUN turbo build --filter=${SERVICE} --no-cache



# PRODUCTION
FROM nginx:1.25.3-alpine as production 

ARG SERVICE

COPY apps/${SERVICE}/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/${SERVICE}/build /usr/share/nginx/html
