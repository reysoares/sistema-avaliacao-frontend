import { useState } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa"; // adicione FaArrowLeft
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/avaliacaoLogo.svg";
import fundo from "../../assets/fundo.png";
import "@styles/FormularioBase.css";

const RecuperarConta = () => {
  const [email, setEmail] = useState("");
  const [modo, setModo] = useState("senha"); // 'senha' ou 'usuario'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Informe um email válido.");

    if (modo === "senha") {
      console.log("Recuperação de senha enviada para:", email);
      alert("Verifique seu email para redefinir a senha.");
    } else {
      console.log("Recuperação de usuário para:", email);
      alert("Sua matrícula foi enviada para o email informado.");
    }
  };

  return (
    <div
      className="form-background"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" />
          <h1>{modo === "senha" ? "Recuperar Senha" : "Recuperar Usuário"}</h1>

          <div className="input-field">
            <FaEnvelope className="icon-left" />
            <input
              type="email"
              placeholder="Email institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {modo === "senha"
              ? "Enviar instruções de senha"
              : "Enviar matrícula por email"}
          </button>

          <div className="recall-toggle">
            {modo === "senha" ? (
              <p>
                Esqueceu sua matrícula?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setModo("usuario")}
                >
                  Recuperar usuário
                </span>
              </p>
            ) : (
              <p>
                Lembrou sua matrícula?{" "}
                <span className="toggle-link" onClick={() => setModo("senha")}>
                  Recuperar senha
                </span>
              </p>
            )}
          </div>

          <Link
            to="/login"
            className="botao-voltar-login"
            title="Voltar para o login"
          >
            <FaArrowLeft className="icone-voltar" />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RecuperarConta;
