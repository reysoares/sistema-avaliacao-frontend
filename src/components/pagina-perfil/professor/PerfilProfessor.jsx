// src/components/pagina-perfil/professor/PerfilProfessor.jsx (VERSÃO FINAL)

import React, { useState, useEffect, useCallback } from "react";
import PerfilUserBase from "../../layouts/PerfilUserBase";
import PerfilProfessorEdicao from "./PerfilProfessorEdicao"; // <-- Importamos o componente de edição
import { useAuth } from "../../../hooks/useAuth.js";
import apiPrivate from "../../../api/apiPrivate.js";

const PerfilProfessor = () => {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Usamos useCallback para evitar recriar a função a cada renderização
  const fetchPerfil = useCallback(async () => {
    if (!user) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await apiPrivate.get(`/public/professor/perfil/${user.usuario.id}`);
      setProfessor(response.data);
    } catch (err) {
      setError("Não foi possível carregar os dados do perfil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPerfil();
  }, [fetchPerfil]);
  
  // Função que será chamada pelo componente de edição após salvar
  const handleSalvarEdicao = () => {
    setModoEdicao(false);
    fetchPerfil(); // Recarrega os dados para mostrar as atualizações
  };

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!professor) return <div>Nenhum dado de perfil encontrado.</div>;
  
  // ================================================================
  // LÓGICA DE RENDERIZAÇÃO CONDICIONAL
  // ================================================================
  if (modoEdicao) {
    return (
      <PerfilProfessorEdicao
        dados={professor}
        onSalvar={handleSalvarEdicao}
        onCancelar={() => setModoEdicao(false)}
      />
    );
  }

  const informacoes = [
    // ... (resto do código que você já tinha)
    { label: "Nome", valor: professor.nome },
    { label: "Ocupação", valor: "Professor" },
    { label: "Departamento", valor: professor.departamento || "Não informado" },
    { label: "Unidade de Ensino", valor: professor.unidadeEnsino || "Não informado" },
    { label: "Área de Atuação", valor: professor.areaAtuacao || "Não informado" },
    { label: "Data de Nascimento", valor: new Date(professor.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) },
    { label: "Matrícula Funcional", valor: professor.matriculaFuncional },
  ];

  return (
    <PerfilUserBase
      nome={professor.nome}
      emailInstitucional={professor.emailInstitucional}
      perfil="Professor"
      imagem={professor.imagem}
      perfilDescricao={professor.descricao || "Sem descrição disponível."}
      informacoes={informacoes}
      isPrivate={true}
      onEditar={() => setModoEdicao(true)}
    />
  );
};

export default PerfilProfessor;