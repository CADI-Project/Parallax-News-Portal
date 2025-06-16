const express = require("express");
const cors = require("cors");
const NewsAPI = require("newsapi");

const app = express();
app.use(cors());

const API_KEY = "102de15f0dda4374bc64d305f566e4ce";
const newsapi = new NewsAPI(API_KEY);

app.get("/noticias-com-imagem", async (req, res) => {
  try {
    const response = await newsapi.v2.everything({
      q: "Brasil", //
      language: "pt",
      from: "2025-06-01",
      to: "2025-06-03",
      sortBy: "publishedAt",
      pageSize: 5,
    });

    const noticiasComImagem = response.articles.filter(
      (article) => article.urlToImage
    );

    res.json(noticiasComImagem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(Servidor rodando na porta ${PORT});
});