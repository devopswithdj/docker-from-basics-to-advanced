FROM node:alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:alpine3.22
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]