# Build stage: compile Next.js app to static output
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY next-app/package*.json ./
RUN npm ci

# Copy source and build
COPY next-app/ .
RUN npm run build

# Production stage: serve with nginx
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
CMD ["sh", "-c", "echo Starting Nginx to serve static assets && nginx -g 'daemon off;'"]
