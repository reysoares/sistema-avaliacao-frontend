import React, { useState } from "react";
import PerfilUserBase from "../../layouts/PerfilUserBase";
import PerfilProfessorEdicao from "./PerfilProfessorEdicao";

const PerfilProfessor = ({
  dadosPublicos = {
    nome: "Nome não informado",
    emailInstitucional: "email@exemplo.com",
    perfil: "Professor",
    perfilDescricao: "Descrição não disponível.",
    imagem: undefined,
    departamento: "Departamento não informado",
    unidadeEnsino: "Unidade não informada",
    areaAtuacao: "Área não informada",
  },
  dadosPrivados = {
    matriculaFuncional: "Não informada",
    dataNascimento: "Não informada",
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
      <PerfilProfessorEdicao
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
    { label: "Ocupação", valor: "Professor" },
    { label: "Departamento", valor: dadosPublicos.departamento },
    { label: "Unidade de Ensino", valor: dadosPublicos.unidadeEnsino },
    { label: "Área de Atuação", valor: dadosPublicos.areaAtuacao },
    ...(isPrivate
      ? [
          { label: "Data de Nascimento", valor: dadosPrivados.dataNascimento },
          {
            label: "Matrícula Funcional",
            valor: dadosPrivados.matriculaFuncional,
          },
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

export default PerfilProfessor;
