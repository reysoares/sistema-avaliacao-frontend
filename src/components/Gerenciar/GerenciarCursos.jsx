import React, { useState, useEffect } from "react";
import PaginaBase from "../layouts/PaginaBase";
import api from "../../api/axios"; // <-- usa o axios criado
import "@styles/Gerenciar.css";

const GerenciarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const [novoCurso, setNovoCurso] = useState({ nome: "", coordenadorId: "" });

  // Carregar cursos
  const carregarCursos = async () => {
    try {
      const res = await api.get("/cursos");
      setCursos(res.data);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
    }
  };

  // Carregar professores
  const carregarProfessores = async () => {
    try {
      const res = await api.get("/professores");
      setProfessores(res.data);
    } catch (err) {
      console.error("Erro ao buscar professores:", err);
    }
  };

  useEffect(() => {
    carregarCursos();
    carregarProfessores();
  }, []);

  const handleAdicionar = () => {
    setNovoCurso({ nome: "", coordenadorId: "" });
    setEditando(false);
    setShowModal(true);
  };

  const handleSalvar = async () => {
    const body = {
      nome: novoCurso.nome,
      coordenador: { id: parseInt(novoCurso.coordenadorId) },
    };

    try {
      if (editando && cursoSelecionado) {
        await api.put(`/cursos/${cursoSelecionado.id}`, body);
      } else {
        await api.post("/cursos", body);
      }

      await carregarCursos();
      setShowModal(false);
      setCursoSelecionado(null);
    } catch (err) {
      console.error("Erro ao salvar curso:", err);
      alert("Erro ao salvar curso.");
    }
  };

  const handleEditar = () => {
    if (!cursoSelecionado) {
      alert("Selecione um curso para editar.");
      return;
    }

    setNovoCurso({
      nome: cursoSelecionado.nome,
      coordenadorId: cursoSelecionado.coordenador?.id || "",
    });
    setEditando(true);
    setShowModal(true);
  };

  const handleExcluir = () => {
    if (!cursoSelecionado) {
      alert("Selecione um curso para excluir.");
      return;
    }

    setConfirmarExclusao(true);
  };

  const confirmarRemocao = async () => {
    try {
      await api.delete(`/cursos/${cursoSelecionado.id}`);
      await carregarCursos();
      setConfirmarExclusao(false);
      setCursoSelecionado(null);
    } catch (err) {
      console.error("Erro ao excluir curso:", err);
      alert("Erro ao excluir curso.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCurso((prev) => ({ ...prev, [name]: value }));
  };

  const selecionarCurso = (curso) => {
    setCursoSelecionado(cursoSelecionado?.id === curso.id ? null : curso);
  };

  return (
    <PaginaBase
      botaoDireito={
        <button onClick={() => window.history.back()} className="botao-navbar">
          Voltar
        </button>
      }
    >
      <div className="gerenciar-cursos">
        <h1 className="titulo-principal">Gerenciar Cursos</h1>

        <div className="acoes-superiores">
          <button className="botao-adicionar" onClick={handleAdicionar}>
            + Adicionar Curso
          </button>
          <button className="botao-editar" onClick={handleEditar}>
            Editar Curso
          </button>
          <button className="botao-excluir" onClick={handleExcluir}>
            Excluir Curso
          </button>
        </div>

        <div className="tabela-cursos">
          {cursos.length === 0 ? (
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
                    className={
                      cursoSelecionado?.id === curso.id ? "linha-selecionada" : ""
                    }
                    onClick={() => selecionarCurso(curso)}
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

        {/* Modal Adicionar/Editar */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editando ? "Editar Curso" : "Novo Curso"}</h2>

              <label>Nome do curso:</label>
              <input
                type="text"
                name="nome"
                value={novoCurso.nome}
                onChange={handleInputChange}
              />

              <label>Coordenador:</label>
              <select
                name="coordenadorId"
                value={novoCurso.coordenadorId}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                {professores.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
                ))}
              </select>

              <div className="modal-botoes">
                <button onClick={() => setShowModal(false)}>Cancelar</button>
                <button onClick={handleSalvar}>Salvar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmação de Exclusão */}
        {confirmarExclusao && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Deseja realmente excluir o curso:</h3>
              <p>
                <strong>{cursoSelecionado?.nome}</strong>?
              </p>
              <div className="modal-botoes">
                <button
                  onClick={() => setConfirmarExclusao(false)}
                  className="botao-nao"
                >
                  Não
                </button>
                <button onClick={confirmarRemocao}>Sim</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PaginaBase>
  );
};

export default GerenciarCursos;
