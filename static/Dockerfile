FROM nginx:1.27-alpine
COPY static/nginx.conf /etc/nginx/conf.d/default.conf
COPY static/ /usr/share/nginx/html
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
