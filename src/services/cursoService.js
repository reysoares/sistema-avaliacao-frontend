// src/services/cursoService.js

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



const update = async (cursoId, cursoData, coordenadorMatricula) => {
    
    const payload = {
      nome: cursoData.nome,
      coordenador: { id: parseInt(cursoData.coordenadorId) }
    };
    // Montar a URL complexa que o backend espera
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
  update,     
  deleteById, 
};

export default cursoService;