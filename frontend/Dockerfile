# Stage 1: Build - Tối ưu caching
FROM node:18-alpine as build
WORKDIR /app

# Copy package files trước để tận dụng Docker layer cache
COPY package*.json ./
# Dùng npm ci thay vì npm install (nhanh hơn và deterministic)
RUN npm ci --only=production --ignore-scripts

# Tăng memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy source code sau (chỉ rebuild khi code thay đổi)
COPY . .
RUN npm run build

# Stage 2: Serve - Image production nhỏ gọn
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]