// src/services/professorService.js 

import api from '../api/axios';
import apiPrivate from '../api/apiPrivate'; 

const getAll = async () => {
  const response = await api.get('/public/professores');
  return response.data;
};


// Atualiza os dados de texto do professor
const update = async (matricula, professorData) => {
    const response = await apiPrivate.put(`/public/professor/${matricula}`, professorData);
    return response.data;
};

// Atualiza apenas a imagem do professor
const updateImagem = async (matricula, imagemFile) => {
    const formData = new FormData();
    formData.append('imagem', imagemFile); // A chave 'imagem' deve corresponder ao @RequestParam do backend

    const response = await apiPrivate.put(`/public/professor/${matricula}/imagem`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


const professorService = {
  getAll,
  update,       // <-- Adicionado
  updateImagem, // <-- Adicionado
};

export default professorService;