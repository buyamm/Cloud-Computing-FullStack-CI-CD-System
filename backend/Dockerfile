FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
