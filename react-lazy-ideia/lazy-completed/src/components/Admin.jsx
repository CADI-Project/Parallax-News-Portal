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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {noticias.slice(0, 5).map((noticia, index) => (
        <section
          key={index}
          className=""
          style={{
            backgroundImage: `url(${noticia.urlToImage})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#000",
              padding: "2rem",
              borderRadius: "1rem",
              maxWidth: "700px",
            }}
          >
            <h1>{noticia.title}</h1>
            <p>{noticia.description}</p>
            <a
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffd700",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Ler mais
            </a>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Admin;
