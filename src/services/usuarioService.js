// src/services/usuarioService.js (NOVO ARQUIVO)

import apiPrivate from "../api/apiPrivate";

// Função genérica para buscar o perfil do usuário logado
const getMeuPerfil = async (perfil) => {
    
    const userId = JSON.parse(localStorage.getItem('user'))?.usuario?.id;
    if (!userId) {
        throw new Error("Usuário não encontrado no localStorage");
    }


    const url = `/api/private/${perfil.toLowerCase()}/perfil/${userId}`;

    const response = await apiPrivate.get(url);
    return response.data;
};


const usuarioService = {
    getMeuPerfil,
};

export default usuarioService;