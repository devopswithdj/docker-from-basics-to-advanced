const http = require('http');
const PORT = 8080;
const server = http.createServer((req, res) => {
  res.end('Hello from Docker!');
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));