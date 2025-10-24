# 🐳 Day 4: Dive into Docker Compose

## 🎯 Objective
By the end of this day, you’ll be able to:
- Understand what Docker Compose is and why it’s useful
- Create and manage multi-container applications
- Understand the connection between Docker Compose and Dockerfile
- Use commands to manage Compose projects

---

## 🧩 What is Docker Compose?
Docker Compose is a tool that helps you **define and run multi-container Docker applications** easily.  
Instead of manually running multiple `docker run` commands, you define all services in a single `docker-compose.yml` file.

### 💡 Why Use Docker Compose?
- Manage multiple containers as a single service
- Define networking, volumes, environment variables easily
- Ensure reproducible multi-container environments

---

## 🏗️ Anatomy of a docker-compose.yml File

Example: A simple Node.js + Redis setup

```yaml
version: "3.8"
services:
  web:
    build: ./app
    ports:
      - "5000:5000"
    environment:
      - REDIS_HOST=redis
  redis:
    image: "redis:alpine"
```

### Explanation:
- `web`: The Node.js app container
- `build`: Specifies where Docker should find the Dockerfile to build this service
- `ports`: Maps container port 5000 to host port 5000
- `redis`: Uses the official Redis image from Docker Hub

---

## 🔗 Connection Between Docker Compose and Dockerfile

Docker Compose **does not replace** the Dockerfile — instead, it **works alongside** it.

### 🧠 How They Work Together
1. Each service in `docker-compose.yml` can **either use an existing image** or **build one** from a Dockerfile.  
2. When you specify `build: ./path`, Docker Compose:
   - Looks for a `Dockerfile` in that directory.
   - Builds the image (using `docker build`) behind the scenes.
   - Tags the image automatically for Compose use.
3. When you use `image:`, Compose pulls that image from Docker Hub (or another registry) instead of building it.

### ⚙️ Example
```yaml
version: "3.8"
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin123
```

**In this setup:**
- `app` is built from a Dockerfile inside the `./app` directory.
- `db` pulls the ready-made Postgres image from Docker Hub.

---

## 🚀 Docker Compose Commands

| Command | Description |
|----------|-------------|
| `docker compose up` | Builds, (re)creates, starts, and attaches to containers |
| `docker compose down` | Stops and removes containers, networks, and volumes |
| `docker compose build` | Builds or rebuilds services defined in Compose file |
| `docker compose ps` | Lists containers managed by Compose |
| `docker compose logs` | View logs for all services |
| `docker compose restart` | Restart all services |

---

## 🧠 Example Project Structure

```
project/
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
│
└── docker-compose.yml
```

### app/Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]
```

### docker-compose.yml
```yaml
version: "3.8"
services:
  web:
    build: ./app
    ports:
      - "8080:8080"
  redis:
    image: "redis:alpine"
```

Now, running:
```bash
docker compose up --build
```
✅ Builds and starts **both the Node app and Redis** automatically.

---

## 🧩 Practical Example — Flask + Redis

**app.py**
```python
from flask import Flask
import redis, os

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379)

@app.route('/')
def home():
    r.incr('hits')
    return f"Hello! You've visited {r.get('hits').decode()} times."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

**Dockerfile**
```dockerfile
FROM python:3.12-alpine
WORKDIR /app
COPY app.py .
RUN pip install flask redis
CMD ["python", "app.py"]
```

**docker-compose.yml**
```yaml
version: '3.9'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - redis
  redis:
    image: redis:alpine
```

Run the stack:
```bash
docker compose up -d
```

Visit 👉 **http://localhost:5000**

---

## ⚙️ 5. Using .env Files

**.env**
```env
FLASK_ENV=development
REDIS_PORT=6379
```

Then reference it in your Compose file:
```yaml
environment:
  - FLASK_ENV=${FLASK_ENV}
```

---

## 🧹 Cleanup
Stop and remove all containers, networks, and volumes created by Compose:
```bash
docker compose down -v
```

---

## 🧭 Summary
| Concept | Description |
|----------|-------------|
| Docker Compose | Tool to define and run multi-container apps |
| docker-compose.yml | Configuration file describing containers |
| build: | Points to a directory containing a Dockerfile |
| image: | Pulls a prebuilt image from Docker Hub |
| docker compose up | Builds and starts all services |
| docker compose down | Stops and removes services |

---

### ✅ End of Docker Crash Course
### 🥳 You are now a pro in using docker - go, build better applications!!!!🎃
