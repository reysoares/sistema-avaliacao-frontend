// src/services/cursoService.js (VERSÃO ATUALIZADA)

import api from '../api/axios';
import apiPrivate from '../api/apiPrivate';

const getAll = async () => {
  const response = await api.get('/public/cursos');
  return response.data;
};

const create = async (cursoData) => {
  const payload = {
    nome: cursoData.nome,
    coordenador: { id: parseInt(cursoData.coordenadorId) }
  };
  const response = await apiPrivate.post('/admin/curso', payload);
  return response.data;
};

// ================================================================
// FUNÇÕES ADICIONADAS
// ================================================================

const update = async (cursoId, cursoData, coordenadorMatricula) => {
    // O backend espera um DTO no corpo e os IDs/matrícula na URL
    const payload = {
      nome: cursoData.nome,
      coordenador: { id: parseInt(cursoData.coordenadorId) }
    };
    // Monta a URL complexa que o backend espera
    const url = `/admin/curso/${cursoId}/professor/${coordenadorMatricula}`;
    const response = await apiPrivate.put(url, payload);
    return response.data;
};

const deleteById = async (cursoId) => {
    const response = await apiPrivate.delete(`/admin/curso/${cursoId}`);
    return response.data;
};


const cursoService = {
  getAll,
  create,
  update,     // <-- Adicionado
  deleteById, // <-- Adicionado
};

export default cursoService;