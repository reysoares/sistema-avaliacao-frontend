// src/components/utilitarios/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  //  Se não houver usuário, redireciona para o login (como antes)
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se a rota exige um perfil específico e o usuário não tem esse perfil, redireciona
  if (allowedRoles && !allowedRoles.includes(user.usuario.perfil)) {
    // Redireciona para a página inicial, pois o usuário não tem permissão
    return <Navigate to="/inicial" />;
  }

  // Se passou em todas as verificações, mostra a página
  return children;
};

export default ProtectedRoute;