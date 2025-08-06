import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/avaliacaoLogo.svg";
import fundo from "../../assets/fundo.png";
import "@styles/FormularioBase.css";
import { Link } from "react-router-dom";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Cadastro enviado:", {
      nome,
      matricula,
      email,
      dataNascimento,
      senha,
    });
  };

  return (
    <div
      className="form-background"
      style={{
        backgroundImage: `url(${fundo})`,
      }}
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" />
          <h1>Cadastro</h1>

          <div className="input-field">
            <FaUser className="icon-left" />
            <input
              type="text"
              placeholder="Nome completo"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaUser className="icon-left" />
            <input
              type="text"
              placeholder="Matrícula Institucional"
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaUser className="icon-left" />
            <input
              type="email"
              placeholder="E-mail Institucional"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaUser className="icon-left" />
            <input
              type="date"
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaLock className="icon-left" />
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            {showSenha ? (
              <FaEyeSlash
                className="toggle-password"
                onClick={() => setShowSenha(false)}
              />
            ) : (
              <FaEye
                className="toggle-password"
                onClick={() => setShowSenha(true)}
              />
            )}
          </div>

          <div className="input-field">
            <FaLock className="icon-left" />
            <input
              type={showConfirmarSenha ? "text" : "password"}
              placeholder="Confirmar Senha"
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {showConfirmarSenha ? (
              <FaEyeSlash
                className="toggle-password"
                onClick={() => setShowConfirmarSenha(false)}
              />
            ) : (
              <FaEye
                className="toggle-password"
                onClick={() => setShowConfirmarSenha(true)}
              />
            )}
          </div>

          <button>Cadastrar</button>

          <div className="signup-link">
            <p>
              Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
