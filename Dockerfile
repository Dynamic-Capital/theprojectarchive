# Build stage: install dependencies and build Next.js app
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY next-app/package*.json next-app/
RUN npm ci --ignore-scripts
RUN npm --prefix next-app ci

# Copy source code and build
COPY . .
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev && npm --prefix next-app prune --omit=dev

# Production stage: run with Node.js server
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "run", "start"]
