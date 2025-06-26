const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  source: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  section: { type: String, required: true } // Para identificar a seção do chat
});

module.exports = mongoose.model('News', newsSchema);