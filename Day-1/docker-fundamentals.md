# 🐳 Day 1: Docker Fundamentals

## 🎯 Goal
By the end of this day, you’ll understand what Docker is, its key components, and how to install, run, and manage your first container.

---

## 📘 1. What is Docker?
**Docker** is an open platform for developing, shipping, and running applications in **containers**.

It helps you:
- Package your app **and all its dependencies** into a single portable unit.
- Run that unit **consistently** on any system (Windows, macOS, Linux, or Cloud).
- Simplify deployment, scaling, and updates.

---

## ⚙️ 2. Why Use Docker?

| Traditional Deployment | Dockerized Deployment |
|------------------------|------------------------|
| “Works on my machine” problems | Runs identically everywhere |
| Heavy virtual machines | Lightweight containers |
| Manual dependency setup | Automated builds via Dockerfile |
| Hard to scale | Scale easily and consistently |

---

## 🧩 3. Key Docker Components

| Component | Description |
|------------|--------------|
| **Docker Engine** | Core service that manages containers |
| **Docker Daemon (`dockerd`)** | Background service that handles images, containers, and networks |
| **Docker CLI (`docker`)** | Command-line interface to interact with Docker |
| **Docker Image** | Read-only blueprint to create containers |
| **Docker Container** | Running instance of an image |
| **Docker Hub** | Registry for storing and sharing Docker images |
| **Dockerfile** | Text file containing steps to build an image |

---

## 🧱 4. Docker Architecture

```
+------------------------------------------+
|             Docker Client (CLI)          |
+------------------------------------------+
                ↓ communicates via REST
+------------------------------------------+
|           Docker Daemon (Engine)         |
|   - Builds Images                        |
|   - Runs Containers                      |
+------------------------------------------+
                ↓ uses
+------------------------------------------+
|        Host OS & Kernel (shared)         |
+------------------------------------------+
|          Hardware / Cloud                |
+------------------------------------------+
```
![Docker Architecture](../assets/images/docker-architecture.png)
---

## 💻 5. Installing Docker

### 🪟 On Windows
1. Install **Docker Desktop** → [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Enable **WSL 2 backend**.
3. Verify installation:
   ```bash
   docker --version
   docker run hello-world
   ```

### 🐧 On Linux (Ubuntu)
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
docker run hello-world
```

### 🍎 On macOS
Install **Docker Desktop for Mac** → Verify:
```bash
docker --version
docker run hello-world
```

---

## 🚀 6. Basic Docker Commands

| Command | Description |
|----------|--------------|
| `docker --version` | Show installed version |
| `docker info` | System-wide Docker info |
| `docker images` | List available images |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers (stopped + running) |
| `docker run hello-world` | Test Docker installation |
| `docker pull <image>` | Download image from Docker Hub |
| `docker stop <id>` | Stop a running container |
| `docker rm <id>` | Remove a container |
| `docker rmi <id>` | Remove an image |
| `docker exec -it <id> bash` | Open shell inside container |

---

## 🧰 7. Running Your First Container

### Step 1️⃣: Pull an image
```bash
docker pull nginx
```

### Step 2️⃣: Run a container
```bash
docker run -d -p 8080:80 nginx
```
Open **http://localhost:8080** → 🎉 You’ll see the Nginx welcome page!

### Step 3️⃣: View running containers
```bash
docker pscmd

```

### Step 4️⃣: Stop & remove container
```bash
docker stop <container_id>
docker rm <container_id>
```

---

## 🏗️ 8. Building a Custom Image (Intro to Dockerfile)

### Example Project Structure
```
app/
 ├─ app.js
 ├─ package.json
 └─ Dockerfile
```

**app.js**
```javascript
const http = require('http');
const PORT = 8080;
const server = http.createServer((req, res) => {
  res.end('Hello from Docker!');
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Dockerfile**
```dockerfile
# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
```

### Build & Run
```bash
docker build -t mynodeapp .
docker run -d -p 8080:8080 mynodeapp
```

Visit **http://localhost:8080** → ✅ App runs inside a container.

---

## 📦 9. Docker Image Layers
- Each `Dockerfile` instruction creates a **layer**.  
- Layers are **cached** → builds become faster.  
- If one layer changes, only subsequent layers rebuild.

🧠 **Tip:** Put frequently changing steps (like `COPY . .`) at the end.

---

## 🕸️ 10. Port Mapping
Containers are isolated. To expose container ports to host:

```bash
docker run -p <host_port>:<container_port> <image>
```
**Example:**
```bash
docker run -p 8080:80 nginx
```
→ Maps container’s **port 80** to **host port 8080**.

---

## 🧠 11. Summary

| Concept | Description |
|----------|--------------|
| **Image** | Template for containers |
| **Container** | Running instance of an image |
| **Dockerfile** | Instructions to build image |
| **Docker Hub** | Public image registry |
| **Port Mapping** | Binds container ports to host machine |
| **Volumes (Next Day)** | Enables persistent data storage |

---

## 🎓 12. End of Day Outcome

✅ You understand Docker fundamentals  
✅ Installed and verified Docker setup  
✅ Ran containers using public images  
✅ Built and ran your own Docker image  
✅ Learned Dockerfile basics and port mapping  

---

## 📚 Resources

- 📘 [Docker Official Docs - Get Started](https://docs.docker.com/get-started/)
- 🎥 [TechWorld with Nana - Docker for Beginners](https://youtu.be/pg19Z8LL06w)
- 🧪 [Play with Docker (Online Sandbox)](https://labs.play-with-docker.com/)

---
