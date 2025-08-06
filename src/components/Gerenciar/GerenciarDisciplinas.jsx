import React, { useState, useEffect } from "react";
import PaginaBase from "../layouts/PaginaBase";
import "@styles/Gerenciar.css"; // Reutilizando o mesmo estilo

const GerenciarDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  const [novaDisciplina, setNovaDisciplina] = useState({
    codigo: "",
    nome: "",
    semestre: "",
    descricao: "",
    cargaHoraria: "",
    professorId: "",
    cursoId: "",
  });

  // Carregar dados da API
  useEffect(() => {
    fetch("http://localhost:8080/api/disciplinas")
      .then((res) => res.json())
      .then((data) => setDisciplinas(data))
      .catch((err) => console.error("Erro ao carregar disciplinas:", err));

    fetch("http://localhost:8080/api/professores")
      .then((res) => res.json())
      .then((data) => setProfessores(data))
      .catch((err) => console.error("Erro ao carregar professores:", err));

    fetch("http://localhost:8080/api/cursos")
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  const handleAdicionar = () => {
    setNovaDisciplina({ codigo: "", nome: "", semestre: "", descricao: "", cargaHoraria: "", professorId: "", cursoId: "" });
    setEditando(false);
    setShowModal(true);
  };

  const handleSalvar = () => {
    // validações simples
    if (!novaDisciplina.codigo.trim() || !novaDisciplina.nome.trim()) {
      alert("Preencha código e nome da disciplina.");
      return;
    }

    if (editando && disciplinaSelecionada) {
      // atualizar
      const atualizado = disciplinas.map((d) =>
        d.codigo === disciplinaSelecionada.codigo
          ? {
              ...disciplinaSelecionada,
              ...novaDisciplina,
              professor: professores.find((p) => p.id === Number(novaDisciplina.professorId)),
              curso: cursos.find((c) => c.id === Number(novaDisciplina.cursoId)),
            }
          : d
      );
      setDisciplinas(atualizado);
    } else {
      // adicionar
      const nova = {
        ...novaDisciplina,
        professor: professores.find((p) => p.id === Number(novaDisciplina.professorId)),
        curso: cursos.find((c) => c.id === Number(novaDisciplina.cursoId)),
      };
      setDisciplinas([...disciplinas, nova]);
    }

    setShowModal(false);
    setDisciplinaSelecionada(null);
  };

  const handleEditar = () => {
    if (!disciplinaSelecionada) {
      alert("Selecione uma disciplina para editar.");
      return;
    }
    setNovaDisciplina({
      codigo: disciplinaSelecionada.codigo,
      nome: disciplinaSelecionada.nome,
      semestre: disciplinaSelecionada.semestre,
      descricao: disciplinaSelecionada.descricao,
      cargaHoraria: disciplinaSelecionada.cargaHoraria,
      professorId: disciplinaSelecionada.professor?.id.toString() || "",
      cursoId: disciplinaSelecionada.curso?.id.toString() || "",
    });
    setEditando(true);
    setShowModal(true);
  };

  const handleExcluir = () => {
    if (!disciplinaSelecionada) {
      alert("Selecione uma disciplina para excluir.");
      return;
    }
    setConfirmarExclusao(true);
  };

  const confirmarRemocao = () => {
    setDisciplinas(disciplinas.filter((d) => d.codigo !== disciplinaSelecionada.codigo));
    setConfirmarExclusao(false);
    setDisciplinaSelecionada(null);
  };

  const selecionarDisciplina = (d) => {
    setDisciplinaSelecionada((prev) => (prev?.codigo === d.codigo ? null : d));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaDisciplina({ ...novaDisciplina, [name]: value });
  };

  return (
    <PaginaBase
      botaoDireito={<button onClick={() => window.history.back()} className="botao-navbar">Voltar</button>}
    >
      <div className="gerenciar-cursos">
        <h1 className="titulo-principal">Gerenciar Disciplinas</h1>

        <div className="acoes-superiores">
          <button className="botao-adicionar" onClick={handleAdicionar}>+ Adicionar Disciplina</button>
          <button className="botao-editar" onClick={handleEditar}>Editar Disciplina</button>
          <button className="botao-excluir" onClick={handleExcluir}>Excluir Disciplina</button>
        </div>

        <div className="tabela-cursos">
          {disciplinas.length === 0 ? (
            <p className="texto-vazio">Nenhuma disciplina cadastrada.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Semestre</th>
                  <th>Carga Horária</th>
                  <th>Professor</th>
                  <th>Curso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((disciplina) => (
                  <tr
                    key={disciplina.codigo}
                    className={disciplinaSelecionada?.codigo === disciplina.codigo ? "linha-selecionada" : ""}
                    onClick={() => selecionarDisciplina(disciplina)}
                  >
                    <td>{disciplina.codigo}</td>
                    <td>{disciplina.nome}</td>
                    <td>{disciplina.semestre}</td>
                    <td>{disciplina.cargaHoraria}h</td>
                    <td>{disciplina.professor?.nome || "N/D"}</td>
                    <td>{disciplina.curso?.nome || "N/D"}</td>
                    <td>
                      {/* Botões de ações na linha (opcional) */}
                      {/* <button className="botao-editar" onClick={handleEditar}>Editar</button>
                      <button className="botao-excluir" onClick={handleExcluir}>Excluir</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de adicionar/editar */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editando ? "Editar Disciplina" : "Nova Disciplina"}</h2>

              <label>Código:</label>
              <input type="text" name="codigo" value={novaDisciplina.codigo} onChange={handleChange} />

              <label>Nome:</label>
              <input type="text" name="nome" value={novaDisciplina.nome} onChange={handleChange} />

              <label>Semestre:</label>
              <input type="text" name="semestre" value={novaDisciplina.semestre} onChange={handleChange} />

              <label>Descrição:</label>
              <textarea name="descricao" value={novaDisciplina.descricao} onChange={handleChange} rows={3} />

              <label>Carga Horária:</label>
              <input type="number" name="cargaHoraria" value={novaDisciplina.cargaHoraria} onChange={handleChange} />

              <label>Professor:</label>
              <select name="professorId" value={novaDisciplina.professorId} onChange={handleChange}>
                <option value="">Selecione</option>
                {professores.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>

              <label>Curso:</label>
              <select name="cursoId" value={novaDisciplina.cursoId} onChange={handleChange}>
                <option value="">Selecione</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>

              <div className="modal-botoes">
                <button onClick={() => setShowModal(false)}>Cancelar</button>
                <button onClick={handleSalvar}>Salvar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {confirmarExclusao && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Deseja realmente excluir a disciplina:</h3>
              <p><strong>{disciplinaSelecionada?.nome}</strong>?</p>
              <div className="modal-botoes">
                <button onClick={() => setConfirmarExclusao(false)} className="botao-nao">Não</button>
                <button onClick={confirmarRemocao}>Sim</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PaginaBase>
  );
};

export default GerenciarDisciplinas;
