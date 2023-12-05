FROM node:20.10.0-alpine AS build 

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm i &> /dev/null

COPY . .

RUN npm run build

FROM node:20.10.0-alpine AS production

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm i

RUN npm ci --omit=dev

COPY --from=build /app/dist ./

USER node

CMD ["node", "main.js"]
