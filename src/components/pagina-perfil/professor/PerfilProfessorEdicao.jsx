// src/components/pagina-perfil/professor/PerfilProfessorEdicao.jsx (VERSÃO ATUALIZADA)

import React, { useState, useRef } from "react";
import PerfilEdicaoBase from "../../layouts/PerfilEdicaoBase";
import CampoEdicao from "../../utilitarios/CampoEdicao";
import professorService from "../../../services/professorService";
import fotoAnonima from "../../../assets/fotoAnonima.png";

const PerfilProfessorEdicao = ({ dados, onSalvar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nome: dados.nome || "",
    descricao: dados.descricao || "",
    dataNascimento: dados.dataNascimento?.split('T')[0] || "",
    emailInstitucional: dados.emailInstitucional || "",
    departamento: dados.departamento || "",
    unidadeEnsino: dados.unidadeEnsino || "",
    areaAtuacao: dados.areaAtuacao || "",
  });
  
  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(dados.imagem || fotoAnonima);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (campo) => (e) => {
    setFormData({ ...formData, [campo]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await professorService.update(dados.matriculaFuncional, formData);
      if (imagemFile) {
        await professorService.updateImagem(dados.matriculaFuncional, imagemFile);
      }
      alert("Perfil atualizado com sucesso!");
      onSalvar();
    } catch (err) {
      setError("Erro ao salvar o perfil. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PerfilEdicaoBase
      form={{ ...formData, imagem: previewUrl }}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancelar={onCancelar}
      loading={loading} // <-- PASSANDO A PROPRIEDADE AQUI
    >
      <input 
        type="file" 
        accept="image/*"
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleImageChange}
      />
      <button type="button" className="botao-editar" style={{marginBottom: '20px'}} onClick={() => fileInputRef.current.click()}>
        Alterar Foto
      </button>
      <CampoEdicao label="Departamento" valor={formData.departamento} onChange={handleChange("departamento")} />
      <CampoEdicao label="Unidade de Ensino" valor={formData.unidadeEnsino} onChange={handleChange("unidadeEnsino")} />
      <CampoEdicao label="Área de Atuação" valor={formData.areaAtuacao} onChange={handleChange("areaAtuacao")} />
      
      {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
    </PerfilEdicaoBase>
  );
};

export default PerfilProfessorEdicao;