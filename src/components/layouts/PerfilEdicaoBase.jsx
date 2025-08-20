// src/components/layouts/PerfilEdicaoBase.jsx (VERSÃO 100% COMPLETA)

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
  loading,
}) => {
  return (
    <PaginaBase
      botaoDireito={
        <button className="botao-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      }
    >
      <h1 className="titulo-principal">Editar Perfil</h1>

      <div className="perfil-container">
        <div className="perfil-coluna-esquerda">
          <p className="foto-label">Foto de perfil</p>
          <img
            src={form.imagem || fotoAnonima}
            alt="Foto de perfil"
            className="perfil-imagem"
          />
        </div>

        <form className="perfil-coluna-direita" onSubmit={onSubmit}>
          <CampoEdicao
            label="Nome completo"
            valor={form.nome}
            onChange={onChange("nome")}
            required
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

          {/* Campos específicos do tipo de usuário (ex: departamento) */}
          {children}

          <div className="botoes-acoes-wrapper">
            <button
              type="button"
              className="botao-cancelar"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button type="submit" className="botao-editar" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </PaginaBase>
  );
};

export default PerfilEdicaoBase;