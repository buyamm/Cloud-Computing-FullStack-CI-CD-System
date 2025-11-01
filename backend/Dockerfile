FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
