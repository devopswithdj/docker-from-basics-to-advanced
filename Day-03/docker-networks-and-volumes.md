# 🐳 Day 3: Docker Networking & Volumes

## 🎯 Goal

By the end of this day, you’ll be able to:
✅ Understand how Docker networking works  
✅ Connect multiple containers together  
✅ Expose container ports securely  
✅ Persist data using Docker Volumes  
✅ Manage volumes and networks in real-world setups  

---

## ⚙️ 1. Recap of Day 2

You learned:
- How to build Docker images from Dockerfiles.
- How to tag, version, push, and pull images.
- How to optimize image size and caching using multi-stage builds.

---

## 🌐 2. What is Docker Networking?

Docker provides an **isolated virtual network** for containers to communicate.  
Every container gets its own **IP address** inside Docker’s network.

### 🔹 Common Docker Network Types

| Network Type | Description | Example Use Case |
|---------------|--------------|------------------|
| **bridge** | Default network — containers communicate via virtual bridge | Single-host setups |
| **host** | Shares host’s network stack | High-performance apps (like monitoring) |
| **none** | No networking | For isolated tasks |
| **overlay** | Connects containers across multiple Docker hosts | Used in Swarm or multi-node setups |
| **macvlan** | Assigns MAC address to each container | Advanced use cases — simulating multiple devices |

---

## 🌉 3. Inspecting Networks

### List All Networks
```bash
docker network ls
```

### Inspect a Specific Network
```bash
docker network inspect bridge
```

### Create a Custom Network
```bash
docker network create my_network
```

---

## 🔗 4. Connecting Containers Together

Let’s create a small app with **two containers** — one backend (Python Flask) and one database (Redis).

### Step 1️⃣: Create a Network
```bash
docker network create app_network
```

### Step 2️⃣: Run Redis Container
```bash
docker run -d --name redis_db --network app_network redis
```

### Step 3️⃣: Run Flask App Connected to Redis
**app.py**
```python
from flask import Flask
import redis

app = Flask(__name__)
r = redis.Redis(host='redis_db', port=6379)

@app.route('/')
def hello():
    r.incr('hits')
    return f"Hello! This page has been visited {r.get('hits').decode()} times."

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

### Build and Run
```bash
docker build -t flask-redis-app .
docker run -d --name flask_app --network app_network -p 5000:5000 flask-redis-app
```

Visit **http://localhost:5000**  
🎉 You’ll see visit count increment each time you refresh!

Inspect both containers and check the network - to notice network is app_network
```bash
docker inspect <container>
```

---

## 🔒 5. Exposing Ports

To make a container accessible outside Docker:
```bash
docker run -d -p 8080:80 nginx
```

This maps:
- **8080 (host port)** → **80 (container port)**

💡 Use `EXPOSE 80` inside Dockerfile to indicate which port the container listens on (for documentation, not enforcement).

🪗 Now we have two containers - Lets try connectivity between them to understand the Networks

### Step 1️⃣: List the contaiers running and inspect the contianers to find respective IPs from network
```bash
docker ps -a
docker inspect <container>

--> In my case flask-app - 172.19.0.3, nginx - 172.17.0.2
```

### Step 2️⃣: Exec into nginx node and install ping
```bash
docker exec -it nginx /bin/bash

apt-get update

apt-get install iputils-ping
```

### Step 3️⃣: Try Hitting flask-app(app_network) from nginx(bridge) (Both are on different networks)
```bash
docker exec -it nginx /bin/bash

ping 172.19.0.3  #This might vary for you.

```
**You must have seen no response from Ping**

### Step 3️4️⃣: Try changing network of nginx to same as flask-app and then ping
```bash
docker network disconnect bridge nginx
docker network connect app_network nginx
docker exec -it nginx /bin/bash
ping 172.19.0.3 #IP of flask-app
```
**🥳 You will see the response from flask app since they are both on same network**

**This completes the networking concept**

---

## 📦 6. Docker Volumes — Persistent Data Storage

When a container is removed, its internal filesystem is deleted too.  
**Volumes** solve this by storing data **outside the container** — on the host system.

---

## 🗂️ 7. Types of Docker Mounts

| Type | Description | When to Use |
|------|--------------|-------------|
| **Volumes** | Managed by Docker (`/var/lib/docker/volumes/`) | Recommended for most apps |
| **Bind Mounts** | Links a host folder to a container path | For local dev |
| **tmpfs Mounts** | Temporary in-memory storage | High-speed, non-persistent |

---

## 🧱 8. Creating and Using Volumes

### Create a Volume
```bash
docker volume create my_data
```

### List Volumes
```bash
docker volume ls
```

### Use Volume in Container
```bash
docker run -d --name mysql_db -v my_data:/var/lib/mysql mysql
```

Now, even if the container is removed, your data in `/var/lib/mysql` persists inside the volume.

---

## 🔍 9. Inspect Volume
```bash
docker volume inspect my_data
```

---

## 🧹 10. Remove Unused Volumes
```bash
docker volume prune
```

---

## 🧩 11. Bind Mount Example (For Local Dev)

If you want to edit code locally and reflect changes inside the container:

```bash
docker run -d -v "$(pwd)":/usr/share/nginx/html -p 8080:80 nginx
```

Now your local files are served directly by the container.  

---

## ⚡ 12. Real-World Example — WordPress with MySQL

Docker Compose (we’ll dive into it in Day 4) simplifies multi-container apps.

**Without Compose:**
```bash
docker network create wp_net
docker volume create db_data

docker run -d --name mysql_db --network wp_net   -v db_data:/var/lib/mysql   -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql:5.7

docker run -d --name wordpress_app --network wp_net   -p 8080:80   -e WORDPRESS_DB_HOST=mysql_db:3306   -e WORDPRESS_DB_USER=root   -e WORDPRESS_DB_PASSWORD=root   wordpress
```

Visit: **http://localhost:8080** → and set up WordPress 🎉

---

## 🧠 13. Inspecting and Managing

| Command | Purpose |
|----------|----------|
| `docker inspect <container>` | See network and volume details |
| `docker network inspect <network>` | See all connected containers |
| `docker volume inspect <volume>` | Check volume mount info |

---

## 🧰 14. Cleanup Commands

```bash
docker rm -f $(docker ps -aq)   # Remove all containers
docker network prune            # Remove unused networks
docker volume prune             # Remove unused volumes
docker system prune -a          # Clean all unused data
```

---

## 🎓 15. End of Day Outcome

✅ Create, inspect, and manage Docker networks  
✅ Link multiple containers for communication  
✅ Expose ports securely  
✅ Create and persist data with Docker Volumes  
✅ Understand bind mounts vs volumes  

---

## 📚 Resources

- 📘 [Docker Docs — Networking](https://docs.docker.com/network/)
- 📘 [Docker Docs — Volumes](https://docs.docker.com/storage/volumes/)

---

🧭 **Next Step → Day 4:** Dive into **Docker Compose** — orchestrating multi-container applications with ease.