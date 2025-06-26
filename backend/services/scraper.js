const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');
const News = require('../models/news');

async function scrapeNews() {
  try {
    // Exemplo com Cheerio (site estático)
    const { data } = await axios.get('https://exemplo.com/noticias');
    const $ = cheerio.load(data);
    
    const newsItems = [];
    
    $('.news-item').each((i, el) => {
      newsItems.push({
        title: $(el).find('h2').text().trim(),
        summary: $(el).find('p').text().trim(),
        link: $(el).find('a').attr('href'),
        source: 'Exemplo Site',
        section: 'principal'
      });
    });
    
    // Exemplo com Puppeteer (site dinâmico)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://outroexemplo.com/noticias');
    
    const dynamicNews = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('.news-card').forEach(card => {
        items.push({
          title: card.querySelector('h3').innerText,
          summary: card.querySelector('.excerpt').innerText,
          link: card.querySelector('a').href,
          source: 'Outro Site',
          section: 'secundaria'
        });
      });
      return items;
    });
    
    await browser.close();
    
    // Combinar resultados
    const allNews = [...newsItems, ...dynamicNews];
    
    // Salvar no banco de dados
    for (const item of allNews) {
      await News.findOneAndUpdate(
        { link: item.link },
        item,
        { upsert: true, new: true }
      );
    }
    
    return { count: allNews.length };
  } catch (err) {
    console.error('Erro no scraping:', err);
    throw err;
  }
}

module.exports = { scrapeNews };