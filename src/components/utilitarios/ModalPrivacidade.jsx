// src/components/modais/ModalPrivacidade.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/Privacidade.css";

// Agora recebe o perfil como prop
const ModalPrivacidade = ({ onFechar, perfil }) => {
  const [secaoAtiva, setSecaoAtiva] = useState("sobreConta");
  const navigate = useNavigate();

  const renderSecao = () => {
    switch (secaoAtiva) {
      case "sobreConta":
        return (
          <div className="secao fade-in">
            <h3>Sobre a Conta</h3>
            <p>
              Este sistema respeita a privacidade dos usuários, conforme as
              diretrizes básicas da LGPD. Seus dados são utilizados apenas para
              fins acadêmicos e não são compartilhados com terceiros.
            </p>
          </div>
        );
      case "sobreSite":
        return (
          <div className="secao fade-in">
            <h3>Sobre o Site</h3>
            <p>
              Este sistema acadêmico foi desenvolvido para fins educacionais e
              administrativos, seguindo políticas básicas de uso e proteção de
              dados.
            </p>
          </div>
        );
      case "excluirConta":
        return (
          <div className="secao fade-in">
            <h3>Excluir Conta</h3>
            <p className="descricao-excluir-conta">
              Caso deseje excluir sua conta, confirme sua identidade abaixo.
              Esta ação é irreversível.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const confirmar = window.confirm(
                  "Deseja prosseguir com a exclusão da conta? Todos os dados serão perdidos e não poderão ser recuperados."
                );
                if (confirmar) {
                  alert("Conta excluída com sucesso.");
                  onFechar();
                  navigate("/login");
                }
              }}
            >
              <input placeholder="Matrícula" required />
              <input placeholder="Senha" type="password" required />
              <input
                placeholder="Confirme sua senha"
                type="password"
                required
              />
              <button type="submit" className="botao-excluir">
                Excluir
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <div className="menu-seletores">
          <button
            onClick={() => setSecaoAtiva("sobreConta")}
            className={secaoAtiva === "sobreConta" ? "ativo" : ""}
          >
            Sobre a Conta
          </button>

          <button
            onClick={() => setSecaoAtiva("sobreSite")}
            className={secaoAtiva === "sobreSite" ? "ativo" : ""}
          >
            Sobre o Site
          </button>

          {/* Botão só visível se NÃO for administrador */}
          {perfil?.toLowerCase() !== "administrador" && (
            <button
              onClick={() => setSecaoAtiva("excluirConta")}
              className={secaoAtiva === "excluirConta" ? "ativo" : ""}
            >
              Excluir Conta
            </button>
          )}
        </div>

        <div className="conteudo-secao">{renderSecao()}</div>

        <button
          className="botao-fechar"
          onClick={onFechar}
          aria-label="Fechar modal"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ModalPrivacidade;
