# 🐳 Day 2: Building and Managing Images

## 🎯 Goal
By the end of this day, you’ll be able to:
✅ Build efficient Docker images  
✅ Understand Dockerfile best practices  
✅ Tag and version images  
✅ Push/pull images from Docker Hub  
✅ Inspect, clean, and manage images effectively
⛷️ Portfolio Website - ReactJS, JavaScript and Docker
---

## 📘 1. Recap of Day 1

You learned:
- What Docker is and how it works.
- How to run containers from existing images (like `nginx`).
- How to build a basic image from a Dockerfile.

---

## 🧩 2. What is a Docker Image?

A **Docker image** is a **blueprint** of your application — it contains:
- The **base OS layer**
- Application code
- Dependencies, libraries, and environment configuration

When you **run** an image → you get a **container** (a running instance of that image).

---

## ⚙️ 3. Lifecycle of a Docker Image

```
Dockerfile → Build → Image → Run → Container → Modify → Commit → New Image
```

---

## 🏗️ 4. Building Docker Images

### Example: Python Application

**app.py**
```python
print("Hello from Dockerized Python App!")
```

**Dockerfile**
```dockerfile
# Use official Python base image
FROM python:3.12-alpine

# Set working directory
WORKDIR /app

# Copy app file
COPY app.py .

# Define command
CMD ["python", "app.py"]
```

### Build the Image
```bash
docker build -t python-demo:1.0 .
```

### Run the Container
```bash
docker run python-demo:1.0
```

**Output:**
```
Hello from Dockerized Python App!
```

---

## 🏷️ 5. Tagging and Versioning Images

Each Docker image can have **tags** to indicate versions.

### Build with a Tag
```bash
docker build -t myapp:1.0 .
```

### List Images
```bash
docker images
```

### Retag an Existing Image
```bash
docker tag myapp:1.0 myapp:latest
```

### Remove an Image
```bash
docker rmi myapp:1.0
```

💡 **Best Practice:**  
Use semantic versioning (`1.0.0`, `1.1.0`, etc.) for your images, just like you do for software releases.

---

## ☁️ 6. Pushing and Pulling Images (Docker Hub)

### Step 1️⃣: Login to Docker Hub
```bash
docker login
```

### Step 2️⃣: Tag Your Image
```bash
docker tag myapp:1.0 your_dockerhub_username/myapp:1.0
```

### Step 3️⃣: Push Image
```bash
docker push your_dockerhub_username/myapp:1.0
```

### Step 4️⃣: Pull from Anywhere
```bash
docker pull your_dockerhub_username/myapp:1.0
```

🎯 Now your image can run anywhere — dev, test, or production.

---

## 🧱 7. Understanding Docker Image Layers

Each Dockerfile instruction (FROM, COPY, RUN, etc.) creates a **new image layer**.

### Example
```dockerfile
FROM python:3.12-alpine
RUN pip install flask
COPY . /app
```

**Layers created:**
1. Base image → Python:3.12-alpine  
2. Flask installation → pip layer  
3. App code → copy layer  

🧠 **Key Insight:**  
If you change your code but not dependencies, Docker reuses cached layers — speeding up builds!

---

## 🧹 8. Managing Images

| Command | Purpose |
|----------|----------|
| `docker images` | List all images |
| `docker inspect <image>` | Detailed info about an image |
| `docker history <image>` | Show image layers |
| `docker rmi <image>` | Remove an image |
| `docker system prune` | Remove all unused data (images, containers, volumes) |

---

## ⚡ 9. Image Optimization Tips

| Technique | Description |
|------------|--------------|
| **Use smaller base images** | Prefer `alpine` variants (e.g., `node:18-alpine`) |
| **Leverage caching** | Order Dockerfile steps wisely |
| **Combine RUN commands** | Reduces number of layers |
| **Clean temporary files** | Use `rm -rf /var/lib/apt/lists/*` |
| **Multi-stage builds** | Use one stage for build, another for runtime |

---

## 🧪 10. Example: Multi-Stage Build (Node.js App)

**Dockerfile**
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

🎯 This approach keeps the final image **tiny and production-ready**.

---

## 🧠 11. Inspecting Layers & Metadata

### View Layers
```bash
docker history myapp:1.0
```

### Inspect Image Details
```bash
docker inspect myapp:1.0
```

---

## 🧰 12. Cleaning Up Unused Data

Free up disk space from dangling images & containers:

```bash
docker image prune -a
docker system prune -a
```

---

## 📊 13. Real-World Tips

- Always add a **`.dockerignore`** file to exclude files like `node_modules`, `.git`, etc.
- Use **specific version tags** (`python:3.12-alpine` not just `python:latest`)
- Automate builds using **CI/CD pipelines**
- Scan your images for vulnerabilities using:
  ```bash
  docker scan myapp:1.0
  ```

---

## 🎓 14. Practical Hands On 

✅[Build a Creative Portfolio website and try dockerizing it.](./portfolio-website.md)
---
