// src/services/avaliacaoService.js (VERSÃO ATUALIZADA)

import api from '../api/axios';
import apiPrivate from '../api/apiPrivate';

const criarAvaliacaoDisciplina = async (avaliacaoData) => {
  const response = await apiPrivate.post('/public/aluno/avaliacao/disciplina', avaliacaoData);
  return response.data;
};

const criarAvaliacaoProfessor = async (avaliacaoData) => {
    const response = await apiPrivate.post('/public/aluno/avaliacao/professor', avaliacaoData);
    return response.data;
};

const getByDisciplina = async (codigoDisciplina) => {
    const response = await api.get(`/public/avaliacoes/disciplina/${codigoDisciplina}`);
    return response.data;
};

// ================================================================
// NOVA FUNÇÃO PARA BUSCAR AVALIAÇÕES DE UM PROFESSOR
// ================================================================
const getByProfessor = async (matriculaProfessor) => {
    const response = await api.get(`/public/professor/avaliacoes/${matriculaProfessor}`);
    return response.data;
};

const avaliacaoService = {
  criarAvaliacaoDisciplina,
  criarAvaliacaoProfessor,
  getByDisciplina,
  getByProfessor, // <-- Adicionada
};

export default avaliacaoService;