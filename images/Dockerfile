FROM nginx:stable

EXPOSE 80

ADD dist /usr/share/nginx/html
COPY images/nginx.conf /etc/nginx/conf.d/default.conf

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]