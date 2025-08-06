import React, { useState } from "react";
import PerfilUserBase from "../../layouts/PerfilUserBase";
import PerfilAdministradorEdicao from "./PerfilAdministradorEdicao";

const PerfilAdministrador = ({
  dadosPublicos = {
    nome: "Nome não informado",
    emailInstitucional: "email@exemplo.com",
    perfil: "Administrador",
    perfilDescricao: "Descrição não disponível.",
    imagem: undefined,
  },
  dadosPrivados = {
    dataNascimento: "Não informada",
    matriculaAdministrativa: "Não informada",
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
      <PerfilAdministradorEdicao
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
    { label: "Ocupação", valor: "Administrador" },
    ...(isPrivate
      ? [
          { label: "Data de Nascimento", valor: dadosPrivados.dataNascimento },
          {
            label: "Matrícula Administrativa",
            valor: dadosPrivados.matriculaAdministrativa,
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

export default PerfilAdministrador;
