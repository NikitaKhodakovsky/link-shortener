# BASE
FROM node:20.10.0-alpine AS base 

WORKDIR /app

ENV NODE_ENV=production

ARG SERVICE



# TURBO
FROM base AS turbo

RUN npm i -g turbo@^2.1.2


# COPY: Exclude nginx folder to prevent cache invalidation at prune and build stages when nginx configuration is changed.
FROM base AS copy

COPY . .

RUN rm -rf "./apps/${SERVICE}/nginx"



# PRUNE
FROM turbo AS prune

COPY --from=copy /app .

RUN turbo prune "${SERVICE}" --docker --out-dir "./pruned/${SERVICE}"



# BUILD
FROM turbo AS build

COPY --from=prune "app/pruned/${SERVICE}/json" .

RUN npm ci --include=dev

COPY --from=prune "app/pruned/${SERVICE}/full" .

COPY tsconfig.json .

ARG BASE_URL

ENV BASE_URL="${BASE_URL}"

RUN turbo run build --filter="${SERVICE}" --no-cache



# PRODUCTION
FROM nginx:1.25.3-alpine AS production 

ARG SERVICE

COPY "apps/${SERVICE}/nginx/default.conf" /etc/nginx/conf.d/default.conf

COPY --from=build "/app/apps/${SERVICE}/dist" /usr/share/nginx/html
