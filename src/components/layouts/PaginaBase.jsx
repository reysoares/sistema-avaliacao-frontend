// src/components/layouts/PaginaBase.jsx 

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import logo from "../../assets/avaliacaoLogo.svg";
import "@styles/PaginaBase.css";

const PaginaBase = ({ children, botaoDireito }) => {
  const location = useLocation();
  const { user } = useAuth();

  const tipoUsuario = user?.usuario.perfil;
  
  const rotaPerfil = (() => {
    switch (tipoUsuario) {
      case "PROFESSOR":
        return "/perfil/professor";
      case "ADMINISTRADOR":
        return "/perfil/administrador";
      case "ALUNO":
        return "/perfil/aluno";
      default:
        return "/login"; // Se não houver usuário, o link de perfil leva ao login
    }
  })();

  const todosLinks = [];

  // Só mostra o link do Dashboard se o usuário for Administrador
  if (tipoUsuario === "ADMINISTRADOR") {
    todosLinks.push({ to: "/administrador/dashboard", label: "Dashboard" });
  }

  // Links visíveis para todos os usuários logados
  if (user) {
    todosLinks.push(
      { to: "/disciplinas", label: "Disciplinas" },
      { to: "/professores", label: "Professores" },
      { to: rotaPerfil, label: "Perfil" }
    );
  }

  // Filtra o link da página atual para não aparecer na navbar
  const navLinks = todosLinks.filter(
    (link) => !location.pathname.startsWith(link.to)
  );

  return (
    <div className="pagina-base">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="titulo-sistema">Sistema de Avaliação</span>
        </div>
        
        {/* Renderiza a parte direita da navbar apenas se houver um usuário logado */}
        {user && (
          <div className="navbar-right">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}
            {botaoDireito}
          </div>
        )}
      </nav>

      <main className="conteudo-inicial">{children}</main>

      <footer className="footer">
        <div className="footer-content">
          <img src={logo} alt="Logo" className="logo-footer" />
          <span className="titulo-footer">
            Sistema de <br /> Avaliação
          </span>
        </div>
      </footer>
    </div>
  );
};

export default PaginaBase;