// src/components/paginas/PaginaProfessores.jsx (VERSÃO FINAL COMPLETA)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaginaBase from '../layouts/PaginaBase';
import professorService from '../../services/professorService';
import avaliacaoService from '../../services/avaliacaoService';
import { useAuth } from '../../hooks/useAuth.js';
import "@styles/Gerenciar.css"; // Reutilizando estilos

const PaginaProfessores = () => {
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    
    // Estados para o modal de avaliação
    const [showAvaliarModal, setShowAvaliarModal] = useState(false);
    const [professorParaAvaliar, setProfessorParaAvaliar] = useState(null);
    const [formData, setFormData] = useState({
        notaDidatica: 3,
        notaDominioConteudo: 3,
        notaInteracaoAlunos: 3,
        comentario: ''
    });

    // Estados para o modal de visualização
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [avaliacoesVisiveis, setAvaliacoesVisiveis] = useState([]);
    const [showVerModal, setShowVerModal] = useState(false);

    useEffect(() => {
        const carregarProfessores = async () => {
            setLoading(true);
            try {
                const response = await professorService.getAll();
                setProfessores(response.content || []);
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar os professores.');
            } finally {
                setLoading(false);
            }
        };
        carregarProfessores();
    }, []);

    const handleAbrirAvaliarModal = (professor) => {
        setProfessorParaAvaliar(professor);
        setFormData({ notaDidatica: 3, notaDominioConteudo: 3, notaInteracaoAlunos: 3, comentario: '' });
        setError('');
        setShowAvaliarModal(true);
    };

    const handleSalvarAvaliacao = async () => {
        if (!professorParaAvaliar || !user) return;
        setLoading(true);
        setError('');
        const avaliacaoPayload = {
            aluno: { matriculaAcademica: user.usuario.matricula },
            professor: { matriculaFuncional: professorParaAvaliar.matriculaFuncional },
            ...formData
        };
        try {
            await avaliacaoService.criarAvaliacaoProfessor(avaliacaoPayload);
            setShowAvaliarModal(false);
            alert('Avaliação enviada com sucesso!');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao enviar avaliação.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerAvaliacoes = async () => {
        if (!professorSelecionado) {
            alert("Selecione um professor para ver as avaliações.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await avaliacaoService.getByProfessor(professorSelecionado.matriculaFuncional);
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
                <h1 className="titulo-principal">Professores</h1>
                
                <div className="acoes-superiores">
                    <button className="botao-adicionar" onClick={handleVerAvaliacoes}>
                        Ver Avaliações
                    </button>
                </div>
                
                {loading && <p>Carregando...</p>}
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                <div className="tabela-cursos">
                    <table>
                        <thead>
                            <tr>
                                <th>Professor</th>
                                <th>Área de Atuação</th>
                                {user?.usuario.perfil === 'ALUNO' && <th>Ação</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {professores.map(p => (
                                <tr key={p.matriculaFuncional} 
                                    className={professorSelecionado?.matriculaFuncional === p.matriculaFuncional ? "linha-selecionada" : ""}
                                    onClick={() => setProfessorSelecionado(p)}>
                                    <td>{p.nome}</td>
                                    <td>{p.areaAtuacao || 'N/D'}</td>
                                    {user?.usuario.perfil === 'ALUNO' && (
                                        <td>
                                            <button className='botao-editar' style={{margin: 0}} onClick={(e) => {e.stopPropagation(); handleAbrirAvaliarModal(p);}}>
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
                            <h2>Avaliar Professor: {professorParaAvaliar?.nome}</h2>

                            <div className="avaliacao-form">
                                <div className="form-group">
                                    <div className="slider-label">
                                        <span>Nota para Didática (1-5):</span>
                                        <span className="slider-value">{formData.notaDidatica}</span>
                                    </div>
                                    <input type="range" min="1" max="5" name="notaDidatica" value={formData.notaDidatica} onChange={handleChange} />
                                </div>
                                
                                <div className="form-group">
                                    <div className="slider-label">
                                        <span>Nota para Domínio do Conteúdo (1-5):</span>
                                        <span className="slider-value">{formData.notaDominioConteudo}</span>
                                    </div>
                                    <input type="range" min="1" max="5" name="notaDominioConteudo" value={formData.notaDominioConteudo} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <div className="slider-label">
                                        <span>Nota para Interação com Alunos (1-5):</span>
                                        <span className="slider-value">{formData.notaInteracaoAlunos}</span>
                                    </div>
                                    <input type="range" min="1" max="5" name="notaInteracaoAlunos" value={formData.notaInteracaoAlunos} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label>Comentário:</label>
                                    <textarea name="comentario" value={formData.comentario} onChange={handleChange} rows="4" placeholder="Deixe um comentário construtivo..." />
                                </div>
                            </div>

                            {error && <p style={{color: 'red'}}>{error}</p>}
                            
                            <div className="modal-botoes">
                                <button className="botao-nao" onClick={() => setShowAvaliarModal(false)}>Cancelar</button>
                                <button onClick={handleSalvarAvaliacao} disabled={loading}>{loading ? 'Enviando...' : 'Enviar Avaliação'}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Ver Avaliações */}
                {showVerModal && (
                    <div className="modal-overlay">
                        <div className="modal" style={{maxWidth: '600px'}}>
                            <h2>Avaliações de: {professorSelecionado?.nome}</h2>
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

export default PaginaProfessores;