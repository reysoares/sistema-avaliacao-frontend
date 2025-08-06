import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import PaginaBase from "../../components/layouts/PaginaBase";
import ModalPrivacidade from "../../components/utilitarios/ModalPrivacidade";
import fotoAnonima from "../../assets/fotoAnonima.png";
import "@styles/Perfil.css";

const PerfilUserBase = ({
  nome,
  emailInstitucional,
  perfil,
  imagem = fotoAnonima,
  perfilDescricao = "Sem descrição disponível.",
  informacoes = [],
  isPrivate = false,
  onEditar = null,
}) => {
  const [modalImagemAberto, setModalImagemAberto] = useState(false);
  const [modalPrivacidadeAberto, setModalPrivacidadeAberto] = useState(false);

  const abrirModalImagem = () => setModalImagemAberto(true);
  const fecharModalImagem = () => setModalImagemAberto(false);
  const abrirModalPrivacidade = () => setModalPrivacidadeAberto(true);
  const fecharModalPrivacidade = () => setModalPrivacidadeAberto(false);

  const numColunas = 2;
  const colunas = Array.from({ length: numColunas }, (_, colIndex) =>
    informacoes.filter((_, i) => i % numColunas === colIndex)
  );

  return (
    <PaginaBase
      navLinks={[
        { to: "/disciplinas", label: "Disciplinas" },
        { to: "/professores", label: "Professores" },
      ]}
      botaoDireito={
        <Link to="/inicial">
          <button className="botao-navbar">Voltar</button>
        </Link>
      }
    >
      <h1 className="titulo-principal">Perfil</h1>

      <div className="perfil-container">
        {/* Botão de Privacidade no canto superior direito */}
        {isPrivate && (
          <div className="privacidade-canto-superior">
            <button
              className="link-privacidade"
              onClick={abrirModalPrivacidade}
            >
              Diretrizes da Conta
            </button>
          </div>
        )}

        {/* Coluna Esquerda */}
        <div className="perfil-coluna-esquerda">
          <p className="foto-label">Foto de perfil</p>
          <img
            src={imagem}
            alt="Foto de perfil"
            className="perfil-imagem"
            onClick={abrirModalImagem}
            style={{ cursor: "pointer" }}
          />

          {isPrivate && (
            <div className="perfil-email">
              <MdEmail size={18} className="email-icon" />
              <span>{emailInstitucional}</span>
            </div>
          )}

          <div className="perfil-descricao-block">
            <strong>Descrição:</strong> {perfilDescricao}
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="perfil-coluna-direita">
          <div className="colunas-container">
            {colunas.map((coluna, idx) => (
              <div className="coluna" key={idx}>
                {coluna.map((item, index) => (
                  <p key={index}>
                    <strong>{item.label}:</strong> {item.valor}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {isPrivate && onEditar && (
            <div className="botao-editar-wrapper">
              <button className="botao-editar" onClick={onEditar}>
                Editar Perfil
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal da imagem ampliada */}
      {modalImagemAberto && (
        <div className="modal-imagem-overlay" onClick={fecharModalImagem}>
          <div
            className="modal-imagem-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagem}
              alt="Imagem ampliada"
              className="imagem-ampliada"
            />
          </div>
        </div>
      )}

      {/* Modal de Privacidade */}
      {modalPrivacidadeAberto && (
        <ModalPrivacidade
          onFechar={fecharModalPrivacidade}
          perfil={perfil} // <-- passa o perfil como prop
        />
      )}
    </PaginaBase>
  );
};

export default PerfilUserBase;
