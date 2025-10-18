# Building a NodeJS Application - Portfolio Website

Portfolio Website is a simple nodejs application that makes use of ReactJS for Frontend, JavaScript for backend, follows MCP model and Dockerized to run in any environment seamlessly.

**Step-1** : Clone the code repo and navigate to portfolio-website
```bash
git clone https://github.com/devopswithdj/docker-from-basics-to-advanced.git

cd Day-02/portfolio-website
--- Run the frontend and backend manually
    cd backend
    npm install 
    npm start  --> this starts the backend on Port 5000

    cd ..
    cd frontend
    npm install
    npm start --> this starts frontend on Port 3000

    https://localhost:3000  --> to view the Website
```

**Step-2** : Dockerize both frontend and backend
```bash
1) Backend

FROM node:alpine3.22
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]

2) Frontend
--> Without Optimizing the Dockerfile
FROM node:alpine3.22
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]

--> With Optimization and Multi-Stage Build
FROM node:alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:alpine3.22
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]

```
**Step-3** : Create Docker images and Run the containers
```docker
cd frontend
docker build -t frontend .
docker run -d -p 3000:3000 frontend

cd backend
docker build -t backend .
docker run -d -p 5000:5000 backend
```
📖References
- 📸 [Complete Walkthrough Images](../assets/Day-02/)
- 📸 [Limitaion of Normal Dockerfile](./need-for-multi-stage-build.png)
- 📸 [Optimized Docker image for Frontend](./multistage-build-for-frontend.png)


🥳 You have successfully dockerized a NodeJS Application
---