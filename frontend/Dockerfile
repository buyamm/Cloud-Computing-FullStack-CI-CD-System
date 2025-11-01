# Stage 1: Build Frontend Application
FROM node:18-alpine AS build

RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# Stage 2: Serve Static Files với Nginx
FROM nginx:1.27-alpine

# Copy file build từ stage trước sang thư mục Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
