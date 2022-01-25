FROM node:14.18.3-alpine as build

RUN mkdir -p /applis/dev/client/

WORKDIR /applis/prod/client/

COPY ./package.json /applis/prod/client/

RUN npm install

COPY ./ /applis/prod/client/

RUN npm run build

FROM nginx:latest

# 404 problem
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /applis/prod/client/dist/client/ /usr/share/nginx/html

EXPOSE 80
