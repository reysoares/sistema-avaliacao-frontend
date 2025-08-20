// src/context/AuthProvider.jsx 

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
      setUser(null); 
    } finally {
      setLoading(false); 
    }
  }, []);

  const login = async (matricula, senha) => {
    
    const userData = await authService.login(matricula, senha);
    setUser(userData);
    navigate('/inicial');
  };

  const logout = () => {
    
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = { user, loading, login, logout }; 

  
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};