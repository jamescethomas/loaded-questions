FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend/build/ /usr/share/nginx/html
COPY docker/images/frontend/nginx.conf /etc/nginx/conf.d/default.conf
