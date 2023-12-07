FROM node:20.10.0-alpine as build 

WORKDIR /app 

COPY package*.json ./

RUN npm i &> /dev/null

COPY . .

ARG PUBLIC_URL

ENV PUBLIC_URL=${PUBLIC_URL}

RUN npm run build 

FROM nginx:1.25.3-alpine as production 

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
