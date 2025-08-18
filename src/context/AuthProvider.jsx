// src/context/AuthContext.jsx

import React, { useState, useEffect } from 'react'; // A importação do 'useContext' foi removida daqui.
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'; // <-- Importa o contexto do novo arquivo

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (matricula, senha) => {
    try {
      const userData = await authService.login(matricula, senha);
      setUser(userData);
      navigate('/inicial');
    } catch (error) {
      console.error("Falha no login:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// REMOVA O HOOK 'useAuth' INTEIRO DESTE ARQUIVO
// export const useAuth = () => { ... }; <-- APAGUE ESSA PARTE