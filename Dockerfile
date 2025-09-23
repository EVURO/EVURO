FROM node:18 AS builder

WORKDIR /app

COPY . /app

RUN yarn install

RUN  yarn nx run evuro-admin-panel:build --configuration=production 

FROM nginx:latest

COPY --from=builder /app/dist/apps/evuro-admin-panel/ /usr/share/nginx/html/
#COPY --from=builder /app/well-known /usr/share/nginx/html/.well-known
#COPY --from=builder /app/default.conf  /etc/nginx/conf.d/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
