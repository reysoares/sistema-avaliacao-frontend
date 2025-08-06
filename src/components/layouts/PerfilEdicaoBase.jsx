import React from "react";
import PaginaBase from "../layouts/PaginaBase";
import fotoAnonima from "../../assets/fotoAnonima.png";
import CampoEdicao from "../../components/utilitarios/CampoEdicao";
import "@styles/PerfilEdicao.css";

const PerfilEdicaoBase = ({
  form,
  onChange,
  onSubmit,
  onCancelar,
  erroData,
  children,
}) => {
  return (
    <PaginaBase
      navLinks={[]}
      botaoDireito={
        <button className="botao-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      }
    >
      <h1 className="titulo-principal">Editar Perfil</h1>

      <div className="perfil-container">
        {/* Coluna da foto */}
        <div className="perfil-coluna-esquerda">
          <p className="foto-label">Foto de perfil</p>
          <img
            src={form.imagem || fotoAnonima}
            alt="Foto de perfil"
            className="perfil-imagem"
          />
        </div>

        {/* Formulário */}
        <form className="perfil-coluna-direita" onSubmit={onSubmit}>
          <CampoEdicao
            label="Nome completo"
            valor={form.nome}
            onChange={onChange("nome")}
            required
          />
          <CampoEdicao
            label="Descrição"
            valor={form.perfilDescricao}
            onChange={onChange("perfilDescricao")}
            tipo="textarea"
          />
          <CampoEdicao
            label="Data de nascimento"
            valor={form.dataNascimento}
            onChange={onChange("dataNascimento")}
            tipo="date"
            required
          />
          {erroData && <p className="erro-validacao">{erroData}</p>}

          <CampoEdicao
            label="E-mail Institucional"
            valor={form.emailInstitucional}
            onChange={onChange("emailInstitucional")}
            required
          />

          {/* Campos específicos do tipo de usuário */}
          {children}

          <div className="botoes-acoes-wrapper">
            <button
              type="button"
              className="botao-cancelar"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button type="submit" className="botao-editar">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </PaginaBase>
  );
};

export default PerfilEdicaoBase;
