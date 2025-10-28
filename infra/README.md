## Thư mục trên EC2 #2: /home/ubuntu/app

Trong đó chứa:

```
/home/ubuntu/app/
├─ docker-compose.prod.yml
├─ deploy_to_ec2.sh
└─ .env          # chứa MONGODB_URI, PORT, NODE_ENV
```

> Khi Jenkins SSH sang EC2 và chạy:

`ssh ubuntu@EC2_IP 'bash -s' < ~/deploy_to_ec2.sh`

Script `deploy_to_ec2.sh` sẽ cd `/home/ubuntu/app` → Docker Compose sẽ đọc docker-compose.prod.yml và .env trong cùng thư mục.

### 📌 Lưu ý nhỏ:

- Đảm bảo script có quyền thực thi:

`chmod +x /home/ubuntu/app/deploy_to_ec2.sh`

- Docker Compose v2 trở lên nên dùng lệnh:

`docker compose -f docker-compose.prod.yml up -d`

thay vì docker-compose (cũ).
