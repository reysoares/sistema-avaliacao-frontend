// src/components/Gerenciar/GerenciarCursos.jsx (VERSÃO 100% COMPLETA E CORRIGIDA)

import React, { useState, useEffect } from "react";
import PaginaBase from "../layouts/PaginaBase";
import cursoService from "../../services/cursoService";
import api from "../../api/axios";
import "@styles/Gerenciar.css";

const GerenciarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [showConfirmarExclusao, setShowConfirmarExclusao] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({ nome: "", coordenadorId: "" });

  const carregarDados = async () => {
    setLoading(true);
    setError("");
    try {
        const [resCursos, resProfessores] = await Promise.all([
            cursoService.getAll(),
            api.get("/public/professores")
        ]);
        setCursos(resCursos.content || []);
        setProfessores(resProfessores.data.content || []);
    } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Não foi possível carregar os dados. Tente novamente.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdicionar = () => {
    setIsEditing(false);
    setFormData({ nome: "", coordenadorId: "" });
    setError("");
    setShowModal(true);
  };

  const handleEditar = () => {
    if (!cursoSelecionado) {
      alert("Por favor, selecione um curso para editar.");
      return;
    }
    setIsEditing(true);
    setFormData({
      nome: cursoSelecionado.nome,
      coordenadorId: cursoSelecionado.coordenador?.id || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleExcluir = () => {
    if (!cursoSelecionado) {
      alert("Por favor, selecione um curso para excluir.");
      return;
    }
    setError("");
    setShowConfirmarExclusao(true);
  };

  const confirmarExclusao = async () => {
    setLoading(true);
    setError("");
    try {
      await cursoService.deleteById(cursoSelecionado.id);
      setShowConfirmarExclusao(false);
      setCursoSelecionado(null);
      await carregarDados();
    } catch (err) {
      setError("Erro ao excluir o curso.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSalvar = async () => {
    setError("");
    if (!formData.nome || !formData.coordenadorId) {
        setError("Nome do curso e coordenador são obrigatórios.");
        return;
    }
    
    setLoading(true);
    try {
      if (isEditing) {
        const coordenadorSelecionado = professores.find(p => p.id === parseInt(formData.coordenadorId));
        if (!coordenadorSelecionado) {
            throw new Error("Coordenador não encontrado na lista.");
        }
        await cursoService.update(cursoSelecionado.id, formData, coordenadorSelecionado.matriculaFuncional);
      } else {
        await cursoService.create(formData);
      }
      setShowModal(false);
      setCursoSelecionado(null);
      await carregarDados();
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Erro ao salvar o curso.`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaginaBase botaoDireito={<button onClick={() => window.history.back()} className="botao-navbar">Voltar</button>}>
      <div className="gerenciar-cursos">
        <h1 className="titulo-principal">Gerenciar Cursos</h1>

        <div className="acoes-superiores">
          <button className="botao-adicionar" onClick={handleAdicionar}>+ Adicionar</button>
          <button className="botao-editar" onClick={handleEditar}>Editar</button>
          <button className="botao-excluir" onClick={handleExcluir}>Excluir</button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && !showModal && !showConfirmarExclusao && <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>{error}</p>}

        <div className="tabela-cursos">
          {!loading && cursos.length === 0 ? (
            <p className="texto-vazio">Nenhum curso cadastrado.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Coordenador</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr
                    key={curso.id}
                    className={cursoSelecionado?.id === curso.id ? "linha-selecionada" : ""}
                    onClick={() => setCursoSelecionado(curso)}
                  >
                    <td>{curso.id}</td>
                    <td>{curso.nome}</td>
                    <td>{curso.coordenador?.nome || "Não definido"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditing ? "Editar Curso" : "Novo Curso"}</h2>
              <label>Nome do curso:</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleInputChange}/>
              <label>Coordenador:</label>
              <select name="coordenadorId" value={formData.coordenadorId} onChange={handleInputChange}>
                <option value="">Selecione um coordenador</option>
                {professores.map((prof) => <option key={prof.id} value={prof.id}>{prof.nome}</option>)}
              </select>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="modal-botoes">
                <button className="botao-nao" onClick={() => setShowModal(false)}>Cancelar</button>
                <button onClick={handleSalvar} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmarExclusao && (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Confirmar Exclusão</h3>
                    <p>Você tem certeza que deseja excluir o curso <strong>{cursoSelecionado?.nome}</strong>?</p>
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

export default GerenciarCursos;