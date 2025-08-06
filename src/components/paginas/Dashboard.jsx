import React from "react";
import { Link } from "react-router-dom";
import PaginaBase from "../layouts/PaginaBase";
import "@styles/Dashboard.css"; // novo arquivo que você pode criar para estilizar essa página

const Dashboard = () => {
  return (
    <PaginaBase
      botaoDireito={
        <Link to="/inicial">
          <button className="botao-navbar">Voltar</button>
        </Link>
      }
    >
      <div className="dashboard-admin">
        <h1 className="titulo-principal">Painel do Administrador</h1>

        <div className="botoes-gerenciamento">
          <Link to="/administrador/cursos">
            <button className="botao-gerenciar">Gerenciar Cursos</button>
          </Link>

          <Link to="/administrador/disciplinas">
            <button className="botao-gerenciar">Gerenciar Disciplinas</button>
          </Link>
        </div>
      </div>
    </PaginaBase>
  );
};

export default Dashboard;

