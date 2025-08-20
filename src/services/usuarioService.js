// src/services/usuarioService.js (NOVO ARQUIVO)

import apiPrivate from "../api/apiPrivate";

// Função genérica para buscar o perfil do usuário logado
const getMeuPerfil = async (perfil) => {
    // A rota exata dependerá do backend, vamos assumir um padrão
    // Ex: /api/alunos/me, /api/professores/me
    // Por enquanto, vamos buscar pelo ID que já temos no token
    const userId = JSON.parse(localStorage.getItem('user'))?.usuario?.id;
    if (!userId) {
        throw new Error("Usuário não encontrado no localStorage");
    }

    // O backend já tem rotas como /api/public/professor/perfil/{id}, vamos usá-las
    // Tornando-as privadas para segurança
    const url = `/api/private/${perfil.toLowerCase()}/perfil/${userId}`;

    const response = await apiPrivate.get(url);
    return response.data;
};


const usuarioService = {
    getMeuPerfil,
};

export default usuarioService;