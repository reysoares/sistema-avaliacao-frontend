import React, { useState } from "react";
import PerfilUserBase from "../../layouts/PerfilUserBase";
import PerfilAlunoEdicao from "./PerfilAlunoEdicao";

const PerfilAluno = ({
  dadosPublicos = {
    nome: "Nome não informado",
    emailInstitucional: "email@exemplo.com",
    perfil: "Aluno",
    perfilDescricao: "Descrição não disponível.",
    imagem: undefined,
    curso: "Curso não informado",
  },
  dadosPrivados = {
    dataNascimento: "Não informado",
    matricula: "Não informada",
    matriz: "Não informada",
    periodoReferencia: "Não informado",
    situacao: "Não informada",
  },
  isPrivate = true,
  onSalvar = (novosDados) => {
    console.log("Salvando...", novosDados);
    alert("Dados atualizados com sucesso!");
  },
}) => {
  const [modoEdicao, setModoEdicao] = useState(false);

  if (modoEdicao) {
    return (
      <PerfilAlunoEdicao
        dados={{ ...dadosPublicos, ...dadosPrivados }}
        onCancelar={() => setModoEdicao(false)}
        onSalvar={(dadosAtualizados) => {
          onSalvar(dadosAtualizados);
          setModoEdicao(false);
        }}
      />
    );
  }

  const informacoes = [
    { label: "Nome", valor: dadosPublicos.nome },
    { label: "Ocupação", valor: dadosPublicos.perfil },
    { label: "Curso", valor: dadosPublicos.curso },
    ...(isPrivate
      ? [
          { label: "Data de Nascimento", valor: dadosPrivados.dataNascimento },
          { label: "Matrícula", valor: dadosPrivados.matricula },
          { label: "Matriz", valor: dadosPrivados.matriz },
          {
            label: "Período de Referência",
            valor: dadosPrivados.periodoReferencia,
          },
          { label: "Situação", valor: dadosPrivados.situacao },
        ]
      : []),
  ];

  return (
    <PerfilUserBase
      nome={dadosPublicos.nome}
      emailInstitucional={dadosPublicos.emailInstitucional}
      perfil={dadosPublicos.perfil}
      imagem={dadosPublicos.imagem}
      perfilDescricao={dadosPublicos.perfilDescricao}
      informacoes={informacoes}
      isPrivate={isPrivate}
      onEditar={() => setModoEdicao(true)}
    />
  );
};

export default PerfilAluno;
