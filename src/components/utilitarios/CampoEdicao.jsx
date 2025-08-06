// CampoEdicao.jsx
import React from "react";

const CampoEdicao = ({ label, valor, tipo = "text", onChange, required }) => (
  <div className="campo-edicao">
    <label className="campo-label">
      {label}
      {required && " *"}
    </label>
    {tipo === "textarea" ? (
      <textarea
        className="campo-input"
        value={valor}
        onChange={onChange}
        required={required}
      />
    ) : (
      <input
        type={tipo}
        className="campo-input"
        value={valor}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

export default CampoEdicao;
