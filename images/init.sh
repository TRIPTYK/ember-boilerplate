#!/bin/sh

echo "{ \"host\":\"$BACKEND_HOST\" }" > /usr/share/nginx/html/config.json
cat /usr/share/nginx/html/config.json
nginx -t
nginx -g "daemon off;"