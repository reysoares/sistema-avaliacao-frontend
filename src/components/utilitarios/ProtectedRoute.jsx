// src/components/utilitarios/ProtectedRoute.jsx (VERSÃO ATUALIZADA)

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

// Agora o componente aceita uma nova propriedade: 'allowedRoles'
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  // 1. Se não houver usuário, redireciona para o login (como antes)
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Se a rota exige um perfil específico e o usuário não tem esse perfil, redireciona
  if (allowedRoles && !allowedRoles.includes(user.usuario.perfil)) {
    // Redireciona para a página inicial, pois o usuário não tem permissão
    return <Navigate to="/inicial" />;
  }

  // Se passou em todas as verificações, mostra a página
  return children;
};

export default ProtectedRoute;