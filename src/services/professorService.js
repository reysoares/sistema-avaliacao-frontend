// src/services/professorService.js (NOVO ARQUIVO)

import api from '../api/axios';

const getAll = async () => {
  const response = await api.get('/public/professores');
  return response.data;
};

const professorService = {
  getAll,
};

export default professorService;