import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/carrossel1.png";
import img2 from "../../assets/carrossel2.png";
import img3 from "../../assets/carrossel3.png";
import PaginaBase from "../layouts/PaginaBase";

const PaginaInicial = () => {
  const imagens = [img1, img2, img3];
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % imagens.length);
    }, 12000);
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  return (
    <PaginaBase
      botaoDireito={
        <Link to="/login">
          <button className="botao-navbar">Sair</button>
        </Link>
      }
    >
      <h1 className="titulo-principal">
        Seja bem-vindo ao Sistema de Avaliação de Professores e Disciplinas!
      </h1>

      <div className="carrossel-wrapper">
        {imagens.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className={`carrossel-img ${index === indiceAtual ? "active" : ""}`}
          />
        ))}
      </div>

      <p className="descricao-sistema">
        Aqui você poderá registrar suas impressões sobre as disciplinas cursadas
        e o desempenho dos professores de forma simples e rápida. Sua opinião é
        muito importante para a melhoria contínua da qualidade do ensino na
        nossa instituição. Por meio da sua participação, conseguimos identificar
        pontos fortes, ajustar estratégias de ensino e promover um ambiente
        acadêmico mais eficiente e acolhedor para todos. Contamos com a sua
        colaboração para tornar a experiência de ensino-aprendizagem cada vez
        melhor. Avalie com responsabilidade e contribua para a evolução da nossa
        comunidade acadêmica!
      </p>

      <h2 className="subtitulo-section">Disciplinas mais acessadas</h2>
      <h2 className="subtitulo-section">Professores mais acessados</h2>
    </PaginaBase>
  );
};

export default PaginaInicial;
