FROM nginx
WORKDIR /usr/share/nginx/html
COPY netlify_copied_files.tar.gz .
RUN tar -xvzf netlify_copied_files.tar.gz
