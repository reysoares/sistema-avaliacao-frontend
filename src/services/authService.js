// src/services/authService.js
import api from '../api/axios';

const login = async (matricula, senha) => {
  const response = await api.post('/public/usuario/login', {
    matricula,
    senha,
  });
  // Se o login for bem-sucedido, armazena o token e os dados do usuário
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// ================================================================
// INÍCIO DA ADIÇÃO
// ================================================================

const register = async (userData) => {
  // O objeto userData deve ter: nome, matricula, email, dataNascimento, senha
  const body = {
    nome: userData.nome,
    matricula: userData.matricula,
    emailInstitucional: userData.email, // O backend espera o campo como 'emailInstitucional'
    dataNascimento: userData.dataNascimento,
    senha: userData.senha,
  };

  const response = await api.post('/public/usuario/cadastro', body);
  return response.data;
};

// ================================================================
// FIM DA ADIÇÃO
// ================================================================


const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  register, // <-- Adicionamos a função aqui
  logout,
  getCurrentUser,
};

export default authService;