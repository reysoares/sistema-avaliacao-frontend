// src/context/AuthProvider.jsx (VERSÃO ATUALIZADA)

import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- NOVO ESTADO DE LOADING
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (e) {
      console.error("Falha ao carregar dados do usuário", e);
      setUser(null); // Garante que o estado fique limpo se houver erro
    } finally {
      setLoading(false); // <-- Termina o carregamento, com ou sem usuário
    }
  }, []);

  const login = async (matricula, senha) => {
    // ... (a função de login continua exatamente a mesma)
    const userData = await authService.login(matricula, senha);
    setUser(userData);
    navigate('/inicial');
  };

  const logout = () => {
    // ... (a função de logout continua exatamente a mesma)
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = { user, loading, login, logout }; // <-- Adiciona 'loading' ao valor do contexto

  // Se ainda estiver carregando, não renderiza o resto da aplicação ainda
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};