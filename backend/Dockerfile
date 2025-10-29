# Sử dụng Node LTS
FROM node:18-alpine

WORKDIR /app

# Copy package files trước để cache dependencies
COPY package*.json ./
# npm ci nhanh hơn npm install
RUN npm ci --only=production --ignore-scripts

# Copy code sau
COPY . .

EXPOSE 5000

# Dùng node trực tiếp thay vì npm start (nhanh hơn)
CMD ["node", "index.js"]
