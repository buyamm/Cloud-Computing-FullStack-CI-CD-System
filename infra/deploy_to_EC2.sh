#!/bin/bash
set -e

echo "🚀 Starting deployment on EC2..."

cd /home/ubuntu/app   # <== Thư mục chứa docker-compose.prod.yml

# cd ./infra/

echo "🧹 Stopping old containers..."
sudo docker compose -f docker-compose.prod.yml down

echo "🧩 Pulling latest images..."
sudo docker compose -f docker-compose.prod.yml pull

echo "🧱 Starting new containers..."
sudo docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "✅ Deployment completed successfully!"
