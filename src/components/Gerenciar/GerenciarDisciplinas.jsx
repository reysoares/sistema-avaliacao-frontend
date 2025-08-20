// src/components/Gerenciar/GerenciarDisciplinas.jsx (VERSÃO FINAL COM LÓGICA DE CARREGAMENTO CORRIGIDA)

import React, { useState, useEffect } from "react";
import PaginaBase from "../layouts/PaginaBase";
import disciplinaService from "../../services/disciplinaService";
import api from "../../api/axios";
import "@styles/Gerenciar.css";

const GerenciarDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [showConfirmarExclusao, setShowConfirmarExclusao] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    codigo: "", nome: "", semestre: "", descricao: "", cargaHoraria: "", professorId: "", cursoId: "",
  });

  // ================================================================
  // FUNÇÃO DE CARREGAMENTO ATUALIZADA (MESMA LÓGICA DO GERENCIAR CURSOS)
  // ================================================================
  const carregarDados = async () => {
    setLoading(true);
    setError("");
    try {
        // Passo 1: Carrega os dados de suporte PRIMEIRO (cursos e professores)
        const [resProfessores, resCursos] = await Promise.all([
            api.get("/public/professores"),
            api.get("/public/cursos")
        ]);
        setProfessores(resProfessores.data.content || []);
        setCursos(resCursos.data.content || []);

        // Passo 2: Carrega as disciplinas. Se falhar, não é um erro fatal para o formulário.
        try {
            const resDisciplinas = await disciplinaService.getAll();
            setDisciplinas(resDisciplinas.content || []);
        } catch (disciplinaError) {
            // Se o erro for "Nenhuma disciplina encontrada", é um estado normal.
            if (disciplinaError.response?.data?.message === 'Nenhuma disciplina encontrada.') {
                setDisciplinas([]); // Apenas garante que a lista fique vazia.
            } else {
                throw disciplinaError; // Lança outros erros inesperados para o catch principal.
            }
        }

    } catch (err) {
        // Este catch agora irá capturar principalmente erros ao carregar professores/cursos.
        setError("Falha ao carregar dados de suporte (professores/cursos).");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdicionar = () => {
    setIsEditing(false);
    setFormData({ codigo: "", nome: "", semestre: "", descricao: "", cargaHoraria: "", professorId: "", cursoId: "" });
    setError("");
    setShowModal(true);
  };

  const handleEditar = () => {
    if (!disciplinaSelecionada) {
      alert("Selecione uma disciplina para editar.");
      return;
    }
    setIsEditing(true);
    setFormData({
      codigo: disciplinaSelecionada.codigo,
      nome: disciplinaSelecionada.nome,
      semestre: disciplinaSelecionada.semestre || "",
      descricao: disciplinaSelecionada.descricao || "",
      cargaHoraria: disciplinaSelecionada.cargaHoraria || "",
      professorId: disciplinaSelecionada.professor?.id || "",
      cursoId: disciplinaSelecionada.curso?.id || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleExcluir = () => {
    if (!disciplinaSelecionada) {
      alert("Selecione uma disciplina para excluir.");
      return;
    }
    setError("");
    setShowConfirmarExclusao(true);
  };
  
  const confirmarExclusao = async () => {
    setLoading(true);
    setError("");
    try {
        await disciplinaService.deleteByCodigo(disciplinaSelecionada.codigo);
        setShowConfirmarExclusao(false);
        setDisciplinaSelecionada(null);
        await carregarDados();
    } catch (err) {
        setError("Erro ao excluir disciplina.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleSalvar = async () => {
    setError("");
    if (!formData.codigo || !formData.nome || !formData.cursoId || !formData.professorId) {
      setError("Código, Nome, Curso e Professor são obrigatórios.");
      return;
    }
    
    setLoading(true);

    const disciplinaPayload = {
        codigo: formData.codigo,
        nome: formData.nome,
        semestre: formData.semestre,
        descricao: formData.descricao,
        cargaHoraria: parseInt(formData.cargaHoraria) || 0,
        cursoId: parseInt(formData.cursoId),
        professorId: parseInt(formData.professorId)
    };

    try {
      if (isEditing) {
        const professorSelecionado = professores.find(p => p.id === parseInt(formData.professorId));
        if (!professorSelecionado) throw new Error("Professor selecionado não encontrado.");
        
        const updatePayload = { ...disciplinaPayload };
        delete updatePayload.cursoId;
        delete updatePayload.professorId;
        
        await disciplinaService.update(disciplinaSelecionada.codigo, updatePayload, formData.cursoId, professorSelecionado.matriculaFuncional);
      } else {
        await disciplinaService.create(disciplinaPayload);
      }
      setShowModal(false);
      setDisciplinaSelecionada(null);
      await carregarDados();
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Erro ao salvar disciplina.";
        setError(errorMessage);
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <PaginaBase botaoDireito={<button onClick={() => window.history.back()} className="botao-navbar">Voltar</button>}>
      <div className="gerenciar-cursos">
        <h1 className="titulo-principal">Gerenciar Disciplinas</h1>
        <div className="acoes-superiores">
          <button className="botao-adicionar" onClick={handleAdicionar}>+ Adicionar</button>
          <button className="botao-editar" onClick={handleEditar}>Editar</button>
          <button className="botao-excluir" onClick={handleExcluir}>Excluir</button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && !showModal && !showConfirmarExclusao && <p style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>{error}</p>}

        <div className="tabela-cursos">
          {!loading && disciplinas.length === 0 ? (
            <p className="texto-vazio">Nenhuma disciplina cadastrada.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Curso</th>
                  <th>Professor</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((d) => (
                  <tr key={d.codigo}
                      className={disciplinaSelecionada?.codigo === d.codigo ? "linha-selecionada" : ""}
                      onClick={() => setDisciplinaSelecionada(d)}>
                    <td>{d.codigo}</td>
                    <td>{d.nome}</td>
                    <td>{d.curso?.nome || "N/D"}</td>
                    <td>{d.professor?.nome || "N/D"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditing ? "Editar Disciplina" : "Nova Disciplina"}</h2>
              <label>Código:</label>
              <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} disabled={isEditing} />
              <label>Nome:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
              <label>Semestre:</label>
              <input type="text" name="semestre" value={formData.semestre} onChange={handleChange} />
              <label>Descrição:</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} />
              <label>Carga Horária (horas):</label>
              <input type="number" name="cargaHoraria" value={formData.cargaHoraria} onChange={handleChange} />
              <label>Professor:</label>
              <select name="professorId" value={formData.professorId} onChange={handleChange}>
                <option value="">Selecione um professor</option>
                {professores.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
              <label>Curso:</label>
              <select name="cursoId" value={formData.cursoId} onChange={handleChange}>
                <option value="">Selecione um curso</option>
                {cursos.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
              {error && <p style={{color: 'red'}}>{error}</p>}
              <div className="modal-botoes">
                <button className="botao-nao" onClick={() => setShowModal(false)}>Cancelar</button>
                <button onClick={handleSalvar} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmarExclusao && (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Confirmar Exclusão</h3>
                    <p>Você tem certeza que deseja excluir a disciplina <strong>{disciplinaSelecionada?.nome}</strong>?</p>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="modal-botoes">
                        <button className="botao-nao" onClick={() => setShowConfirmarExclusao(false)}>Não</button>
                        <button onClick={confirmarExclusao} disabled={loading}>{loading ? "Excluindo..." : "Sim, Excluir"}</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </PaginaBase>
  );
};

export default GerenciarDisciplinas;