import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/avaliacaoLogo.svg";
import "@styles/PaginaBase.css";

const PaginaBase = ({ children, botaoDireito }) => {
  const location = useLocation();
  const tipoUsuario = "Administrador";

  const rotaPerfil = (() => {
    switch (tipoUsuario) {
      case "Professor":
        return "/perfil/professor";
      case "Administrador":
        return "/perfil/administrador";
      default:
        return "/perfil/aluno";
    }
  })();

  const todosLinks = [];

  if (tipoUsuario === "Administrador") {
    todosLinks.push({ to: "/administrador/dashboard", label: "Dashboard" });
  }

  todosLinks.push(
    { to: "/disciplinas", label: "Disciplinas" },
    { to: "/professores", label: "Professores" },
    { to: rotaPerfil, label: "Perfil" }
  );

  const navLinks = todosLinks.filter(
    (link) => !location.pathname.startsWith(link.to)
  );

  return (
    <div className="pagina-base">
      {/* Cabeçalho / Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="titulo-sistema">Sistema de Avaliação</span>
        </div>

        <div className="navbar-right">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
          {botaoDireito}
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="conteudo-inicial">{children}</main>

      {/* Rodapé */}
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
