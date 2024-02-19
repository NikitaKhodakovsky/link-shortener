# BASE

FROM node:20.10.0-alpine AS base

ENV NODE_ENV=production

# BUILD

FROM base AS build

WORKDIR /app

RUN npm i -g turbo

COPY pruned/server/json .

RUN npm ci --include=dev

COPY pruned/server/full .

COPY turbo.json .
COPY tsconfig.json .

#Build the project and all its local dependencies
RUN npx turbo build --no-cache

# Remove turbo cache
RUN npm run clean:turbo

# Remove node_modules
RUN npm run clean:node_modules

# PRODUCTION

FROM base AS production

WORKDIR /app

COPY pruned/server/json .

RUN npm ci --only=production

COPY --from=build /app .

RUN npm cache clean --force

RUN addgroup -S production
RUN adduser -S -D production production
USER production

CMD node apps/server/dist/main.js
