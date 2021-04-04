FROM nginx

WORKDIR /etc/nginx/conf.d
COPY default.conf .

WORKDIR /usr/share/nginx/html
COPY netlify_copied_files.tar.gz .
RUN tar -xvzf netlify_copied_files.tar.gz
RUN rm netlify_copied_files.tar.gz
