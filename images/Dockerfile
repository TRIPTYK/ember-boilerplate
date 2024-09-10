FROM node:20
WORKDIR /app
ARG BUILD_ENV=development
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm ember build --env=${BUILD_ENV}

FROM nginx

EXPOSE 80 443

WORKDIR /usr/share/nginx/
COPY --from=0 /app/dist /usr/share/nginx/html
COPY images/nginx.conf /etc/nginx/conf.d/default.conf

STOPSIGNAL SIGQUIT

WORKDIR /etc/nginx

COPY images/init.sh .
RUN chmod +x /etc/nginx/init.sh

CMD ["/bin/bash","init.sh"]
