# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY . .
RUN npm run build

# Stage 2: Serve (chỉ copy build artifacts)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
