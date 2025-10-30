# Cloud-Computing-FullStack-CI-CD-System


This project demonstrates a CI/CD pipeline for a full-stack application (Frontend + Backend) using Docker, Docker Compose, and Jenkins. It supports two deployment strategies:

1. **Single EC2 instance handling both CI & CD**  
2. **Separated CI and CD across two EC2 instances**

---

## Project Structure
```
project-root/
├── backend/                  # Backend source code
    └── Dockerfile                  
├── frontend/                 # Frontend source code
    └── Dockerfile
├── infra/                    # Infrastructure & deployment scripts
    └── deploy_to_EC2.sh      # Script to deploy on AWS EC2
    └── docker-compose.prod.yml   # Docker Compose configuration for production
    └── Jenkinsfile               # Jenkins CI/CD pipeline definition
└── README.md                 # Project documentation
```

---

## Deployment Strategies

### 1️⃣ Single EC2 Instance (CI + CD)

In this setup, **one EC2 instance** handles everything:

- Build Docker images for Frontend & Backend
- Push images to Docker Hub
- Pull latest images and run containers on the same instance

**Jenkinsfile Highlights:**

- Docker login
- Pull cache images
- Build & push Frontend and Backend images
- Deploy images using `docker compose` on the same server
- Cleanup unused Docker images

**Pros:**

- Simple setup
- Minimal infrastructure cost

**Cons:**

- Less secure: build credentials and production environment share the same host
- CI jobs can affect running production containers if something goes wrong

---

### 2️⃣ Separated CI and CD (Recommended)

In this setup, responsibilities are **split across two EC2 instances**:

#### 🧱 CI EC2 Instance

- Handles **build and push** steps for Docker images (Frontend & Backend)
- Uses `docker buildx` with caching
- Pushes images to Docker Hub (`truongcongly/*`)

#### 🚀 CD EC2 Instance

- Responsible only for **deploying the latest images** to production
- Uses `infra/deploy_to_EC2.sh` script to pull images and restart containers
- Docker commands run with `sudo` to avoid permission issues

**Jenkinsfile Highlights:**

- **CI Steps:** Docker login, pull cache, build & push images (Frontend + Backend)
- **CD Step:** SSH from Jenkins to the deploy EC2 and execute the deployment script
- **Cleanup:** Remove old Docker images after build

**Technical Details:**

- Docker BuildKit + buildx for efficient multi-stage builds
- Jenkins SSH Agent Plugin handles secure key-based authentication
- Security: build credentials are isolated from the production server
- Each EC2 has a single responsibility:  
  - CI = Build & Push  
  - CD = Pull & Deploy

**Verification:**

1. Run pipeline on the CI EC2 → verify images are built & pushed to Docker Hub
2. Jenkins connects to CD EC2 → pulls new images & restarts containers
3. Confirm deployment completes successfully and containers are updated

---

## Usage

### Run Jenkins Pipeline

1. Configure Jenkins credentials:  
   - `dockerhub-cred` for Docker Hub login  
   - `ec2-deploy-key` for SSH to CD EC2

2. Trigger pipeline:  
   - For **single EC2 setup**, pipeline builds & deploys on the same instance  
   - For **separated setup**, CI EC2 handles build & push, then triggers CD EC2 deployment

