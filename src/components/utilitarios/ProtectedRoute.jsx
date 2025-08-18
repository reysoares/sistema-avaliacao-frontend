// src/components/utilitarios/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Se não houver usuário logado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;