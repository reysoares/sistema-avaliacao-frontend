// src/components/paginas/MinhasDisciplinas.jsx

import React, { useState, useEffect } from 'react';
import PaginaBase from '../layouts/PaginaBase';
import disciplinaService from '../../services/disciplinaService';
import avaliacaoService from '../../services/avaliacaoService';
import { useAuth } from '../../hooks/useAuth.js';
import "@styles/Gerenciar.css"; // Reutilizando estilos

const MinhasDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Estados para o modal de avaliação
    const [showModal, setShowModal] = useState(false);
    const [disciplinaParaAvaliar, setDisciplinaParaAvaliar] = useState(null);
    const [formData, setFormData] = useState({
        notaConteudo: 3,
        notaCargaTrabalho: 3,
        notaInfraestrutura: 3,
        comentario: ''
    });

    const { user } = useAuth(); // Pega o usuário logado do nosso contexto

    useEffect(() => {
        const carregarDisciplinas = async () => {
            setLoading(true);
            try {
                // Idealmente, aqui seria uma chamada para buscar apenas as disciplinas DO ALUNO.
                // Por enquanto, vamos usar a lista de todas as disciplinas.
                const response = await disciplinaService.getAll();
                setDisciplinas(response.content || []);
            } catch (err) {
                setError('Não foi possível carregar as disciplinas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        carregarDisciplinas();
    }, []);

    const handleAbrirModal = (disciplina) => {
        setDisciplinaParaAvaliar(disciplina);
        // Reseta o formulário
        setFormData({ notaConteudo: 3, notaCargaTrabalho: 3, notaInfraestrutura: 3, comentario: '' });
        setError('');
        setShowModal(true);
    };

    const handleSalvarAvaliacao = async () => {
        if (!disciplinaParaAvaliar || !user) return;

        setLoading(true);
        setError('');

        // Monta o DTO que o backend espera
        const avaliacaoPayload = {
            aluno: { matriculaAcademica: user.usuario.matricula }, // <-- Adiciona o aluno logado
            disciplina: { codigo: disciplinaParaAvaliar.codigo }, // <-- Adiciona a disciplina selecionada
            ...formData
        };

        try {
            await avaliacaoService.criarAvaliacaoDisciplina(avaliacaoPayload);
            setShowModal(false);
            alert('Avaliação enviada com sucesso!');
            // Opcional: recarregar a lista ou marcar a disciplina como avaliada
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erro ao enviar avaliação.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <PaginaBase>
            <div className="gerenciar-cursos">
                <h1 className="titulo-principal">Minhas Disciplinas para Avaliar</h1>
                
                {loading && <p>Carregando...</p>}
                {error && !showModal && <p style={{color: 'red'}}>{error}</p>}

                <div className="tabela-cursos">
                    {disciplinas.length === 0 && !loading ? (
                        <p className="texto-vazio">Nenhuma disciplina disponível para avaliação.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Professor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplinas.map(d => (
                                    <tr key={d.codigo}>
                                        <td>{d.nome} ({d.codigo})</td>
                                        <td>{d.professor?.nome || 'N/D'}</td>
                                        <td>
                                            <button className='botao-adicionar' onClick={() => handleAbrirModal(d)}>
                                                Avaliar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal de Avaliação */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Avaliar: {disciplinaParaAvaliar?.nome}</h2>
                            <label>Nota para o Conteúdo (1-5):</label>
                            <input type="range" min="1" max="5" name="notaConteudo" value={formData.notaConteudo} onChange={handleChange} />
                            
                            <label>Nota para Carga de Trabalho (1-5):</label>
                            <input type="range" min="1" max="5" name="notaCargaTrabalho" value={formData.notaCargaTrabalho} onChange={handleChange} />

                            <label>Nota para Infraestrutura (1-5):</label>
                            <input type="range" min="1" max="5" name="notaInfraestrutura" value={formData.notaInfraestrutura} onChange={handleChange} />

                            <label>Comentário:</label>
                            <textarea name="comentario" value={formData.comentario} onChange={handleChange} rows="4" />

                            {error && <p style={{color: 'red'}}>{error}</p>}
                            
                            <div className="modal-botoes">
                                <button onClick={() => setShowModal(false)}>Cancelar</button>
                                <button onClick={handleSalvarAvaliacao} disabled={loading}>
                                    {loading ? 'Enviando...' : 'Enviar Avaliação'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PaginaBase>
    );
};

export default MinhasDisciplinas;