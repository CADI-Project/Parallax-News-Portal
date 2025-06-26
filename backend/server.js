const http = require('http');
const app = require('./app');
const { init } = require('./utils/socket');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Inicializar Socket.IO
init(server);

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});