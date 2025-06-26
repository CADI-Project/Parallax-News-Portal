// controllers/news.js
const News = require('../models/news');
const { scrapeNews } = require('../services/scraper');

exports.getNews = async (req, res) => {
  try {
    const { section, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (section) query.section = section;
    
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.scrapeNews = async (req, res) => {
  try {
    const result = await scrapeNews();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};