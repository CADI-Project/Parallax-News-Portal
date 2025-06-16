import React, { useEffect, useState } from "react";
import AdminHello from "./AdminHello";

const Admin = () => {
  const [sources, setSources] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/noticias-com-imagem")
      .then((response) => response.json())
      .then((data) => {
        setNoticias(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="admin">
      <AdminHello />
      <h2>Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Fontes de notícias:</h3>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <strong>{source.name}</strong> - {source.description}
          </li>
        ))}
      </ul>

      <h3>Notícias com Imagem:</h3>
      <ul>
        {noticias.map((noticia, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            <h4>{noticia.title}</h4>
            {noticia.urlToImage && (
              <img
                src={noticia.urlToImage}
                alt={noticia.title}
                style={{ maxWidth: "300px" }}
              />
            )}
            <p>{noticia.description}</p>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">
              Ler mais
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Admin;
