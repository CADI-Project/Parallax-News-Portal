const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const newsRoutes = require('./routes/news');
const chatRoutes = require('./routes/chat');
const { init } = require('./utils/socket');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexão com o banco de dados
connectDB();

// Rotas
app.use('/api/news', newsRoutes);
app.use('/api/chat', chatRoutes);

// Rota de scraping (protegida em produção)
app.get('/scrape', async (req, res) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-api-key'] !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }
  
  const newsController = require('./controllers/news');
  await newsController.scrapeNews(req, res);
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app;