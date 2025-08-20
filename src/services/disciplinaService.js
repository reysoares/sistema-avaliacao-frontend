// src/services/disciplinaService.js 

import api from '../api/axios';
import apiPrivate from '../api/apiPrivate';

const getAll = async () => {
  const response = await api.get('/public/disciplina');
  return response.data;
};

const create = async (disciplinaData) => {
  const response = await apiPrivate.post('/admin/disciplina', disciplinaData);
  return response.data;
};


const update = async (codigo, disciplinaData, cursoId, professorMatricula) => {
    // A URL de update do backend é bastante complexa, vamos montá-la
    const url = `/admin/disciplina/${codigo}/curso/${cursoId}/professor/${professorMatricula}`;
    // O corpo da requisição é o DTO da disciplina
    const response = await apiPrivate.put(url, disciplinaData);
    return response.data;
};

const deleteByCodigo = async (codigo) => {
    const response = await apiPrivate.delete(`/admin/disciplina/${codigo}`);
    return response.data;
};

const disciplinaService = {
  getAll,
  create,
  update,         // <-- Adicionado
  deleteByCodigo, // <-- Adicionado
};

export default disciplinaService;