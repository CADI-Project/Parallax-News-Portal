const socketio = require('socket.io');
const Chat = require('../models/chat');

let io;

exports.init = (httpServer) => {
  io = socketio(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  
  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);
    
    // Entrar na sala de uma notícia específica
    socket.on('join news room', (newsId) => {
      socket.join(newsId);
      console.log(`Cliente ${socket.id} entrou na sala da notícia ${newsId}`);
    });
    
    // Enviar mensagem para uma notícia
    socket.on('send message', async ({ newsId, user, message }) => {
      try {
        const savedMessage = await exports.saveChatMessage({ newsId, user, message });
        io.to(newsId).emit('new message', savedMessage);
      } catch (err) {
        console.error('Erro ao salvar mensagem:', err);
      }
    });
    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
  
  return io;
};

exports.getIO = () => {
  if (!io) {
    throw new Error('Socket.io não inicializado');
  }
  return io;
};