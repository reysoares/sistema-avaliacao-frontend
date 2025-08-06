import React, { useState } from "react";
import PerfilEdicaoBase from "../../layouts/PerfilEdicaoBase";
import CampoEdicao from "../../utilitarios/CampoEdicao";

const PerfilAdministradorEdicao = ({ dados, onSalvar, onCancelar }) => {
  const [form, setForm] = useState({ ...dados });
  const [erroData, setErroData] = useState("");

  const handleChange = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
    if (campo === "dataNascimento") setErroData("");
  };

  const validarDataNascimento = (data) => {
    if (!data) return "A data de nascimento é obrigatória.";
    const hoje = new Date();
    const nascimento = new Date(data);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const aniversarioEsteAno = new Date(
      hoje.getFullYear(),
      nascimento.getMonth(),
      nascimento.getDate()
    );
    const idadeFinal = aniversarioEsteAno > hoje ? idade - 1 : idade;
    if (isNaN(nascimento.getTime())) return "Data inválida.";
    if (idadeFinal < 18) return "Você deve ter pelo menos 18 anos.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erro = validarDataNascimento(form.dataNascimento);
    if (erro) {
      setErroData(erro);
      return;
    }
    onSalvar(form);
  };

  return (
    <PerfilEdicaoBase
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancelar={onCancelar}
      erroData={erroData}
    ></PerfilEdicaoBase>
  );
};

export default PerfilAdministradorEdicao;
