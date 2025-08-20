// src/components/paginas/PaginaDisciplinas.jsx (VERSÃO FINAL COMPLETA)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaginaBase from '../layouts/PaginaBase';
import disciplinaService from '../../services/disciplinaService';
import avaliacaoService from '../../services/avaliacaoService';
import { useAuth } from '../../hooks/useAuth.js';
import "@styles/Gerenciar.css";


const PaginaDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth(); // Pega o usuário logado do nosso contexto
    
    // Estados para o modal de avaliação
    const [showAvaliarModal, setShowAvaliarModal] = useState(false);
    const [disciplinaParaAvaliar, setDisciplinaParaAvaliar] = useState(null);
    const [formData, setFormData] = useState({ notaConteudo: 3, notaCargaTrabalho: 3, notaInfraestrutura: 3, comentario: '' });

    // Estados para o modal de visualização
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [avaliacoesVisiveis, setAvaliacoesVisiveis] = useState([]);
    const [showVerModal, setShowVerModal] = useState(false);

    useEffect(() => {
        const carregarDisciplinas = async () => {
            setLoading(true);
            try {
                const response = await disciplinaService.getAll();
                setDisciplinas(response.content || []);
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar as disciplinas.');
            } finally {
                setLoading(false);
            }
        };
        carregarDisciplinas();
    }, []);

    const handleAbrirAvaliarModal = (disciplina) => {
        setDisciplinaParaAvaliar(disciplina);
        setFormData({ notaConteudo: 3, notaCargaTrabalho: 3, notaInfraestrutura: 3, comentario: '' });
        setError('');
        setShowAvaliarModal(true);
    };

    const handleSalvarAvaliacao = async () => {
        if (!disciplinaParaAvaliar || !user) return;
        setLoading(true);
        setError('');
        const avaliacaoPayload = {
            aluno: { matriculaAcademica: user.usuario.matricula },
            disciplina: { codigo: disciplinaParaAvaliar.codigo },
            ...formData
        };
        try {
            await avaliacaoService.criarAvaliacaoDisciplina(avaliacaoPayload);
            setShowAvaliarModal(false);
            alert('Avaliação enviada com sucesso!');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao enviar avaliação.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerAvaliacoes = async () => {
        if (!disciplinaSelecionada) {
            alert("Selecione uma disciplina para ver as avaliações.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await avaliacaoService.getByDisciplina(disciplinaSelecionada.codigo);
            setAvaliacoesVisiveis(response.content || []);
            setShowVerModal(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao buscar avaliações.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) || value }));
    };

    return (
        <PaginaBase
          botaoDireito={
                <Link to="/inicial">
                    <button className="botao-navbar">Voltar</button>
                </Link>
            }
        >
            <div className="gerenciar-cursos">
                <h1 className="titulo-principal">Disciplinas</h1>
                
                <div className="acoes-superiores">
                    <button className="botao-adicionar" onClick={handleVerAvaliacoes}>
                        Ver Avaliações
                    </button>
                </div>
                
                {loading && <p>Carregando...</p>}
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                <div className="tabela-cursos">
                    {/* ... (código da tabela) ... */}
                    <table>
                        <thead>
                            <tr>
                                <th>Disciplina</th>
                                <th>Professor</th>
                                {user?.usuario.perfil === 'ALUNO' && <th>Ação</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {disciplinas.map(d => (
                                <tr key={d.codigo} 
                                    className={disciplinaSelecionada?.codigo === d.codigo ? "linha-selecionada" : ""}
                                    onClick={() => setDisciplinaSelecionada(d)}>
                                    <td>{d.nome} ({d.codigo})</td>
                                    <td>{d.professor?.nome || 'N/D'}</td>
                                    {user?.usuario.perfil === 'ALUNO' && (
                                        <td>
                                            <button className='botao-editar' style={{margin: 0}} onClick={(e) => {e.stopPropagation(); handleAbrirAvaliarModal(d);}}>
                                                Avaliar
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal de Avaliação (para Alunos) */}
                {showAvaliarModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Avaliar: {disciplinaParaAvaliar?.nome}</h2>
                            <label>Nota para o Conteúdo (1-5): {formData.notaConteudo}</label>
                            <input type="range" min="1" max="5" name="notaConteudo" value={formData.notaConteudo} onChange={handleChange} />
                            
                            <label>Nota para Carga de Trabalho (1-5): {formData.notaCargaTrabalho}</label>
                            <input type="range" min="1" max="5" name="notaCargaTrabalho" value={formData.notaCargaTrabalho} onChange={handleChange} />

                            <label>Nota para Infraestrutura (1-5): {formData.notaInfraestrutura}</label>
                            <input type="range" min="1" max="5" name="notaInfraestrutura" value={formData.notaInfraestrutura} onChange={handleChange} />

                            <label>Comentário:</label>
                            <textarea name="comentario" value={formData.comentario} onChange={handleChange} rows="4" />

                            {error && <p style={{color: 'red'}}>{error}</p>}
                            
                            <div className="modal-botoes">
                                <button onClick={() => setShowAvaliarModal(false)}>Cancelar</button>
                                <button onClick={handleSalvarAvaliacao} disabled={loading}>{loading ? 'Enviando...' : 'Enviar Avaliação'}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Ver Avaliações */}
                {showVerModal && (
                    <div className="modal-overlay">
                        <div className="modal" style={{maxWidth: '600px'}}>
                            <h2>Avaliações de: {disciplinaSelecionada?.nome}</h2>
                            {avaliacoesVisiveis.length > 0 ? (
                                <ul style={{listStyle: 'none', padding: 0}}>
                                    {avaliacoesVisiveis.map(ava => (
                                        <li key={ava.id} style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                                            <p><strong>Comentário:</strong> {ava.comentario || "Sem comentário."}</p>
                                            <p><strong>Média de Notas:</strong> {ava.mediaNotas.toFixed(1)}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p>Nenhuma avaliação encontrada.</p>)}
                            <div className="modal-botoes">
                                <button onClick={() => setShowVerModal(false)}>Fechar</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </PaginaBase>
    );
};

export default PaginaDisciplinas;