FROM node:18-alpine

WORKDIR /app

COPY /app/package*.json ./
COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]