# Sử dụng Node LTS
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và cài dependency
COPY package*.json ./
RUN npm install --production

# Copy toàn bộ code
COPY . .

# Expose cổng (thường là 5000 hoặc 8080)
EXPOSE 5000

# Lệnh chạy app
CMD ["npm", "start"]