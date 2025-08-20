// src/components/Cadastro/Cadastro.jsx

import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa o useNavigate
import authService from "../../services/authService"; // Importa nosso serviço
import logo from "../../assets/avaliacaoLogo.svg";
import fundo from "../../assets/fundo.png";
import "@styles/FormularioBase.css";

const Cadastro = () => {
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estados de controle da UI
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Hook para redirecionamento

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Validação de senhas
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Cria o objeto com os dados para enviar ao serviço
      const userData = { nome, matricula, email, dataNascimento, senha };
      
      // Chama a função de registro do nosso serviço
      await authService.register(userData);

      setSuccess("Cadastro realizado com sucesso! Você será redirecionado para o login.");

      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      // Captura e exibe a mensagem de erro vinda do backend
      const errorMessage = err.response?.data?.message || "Erro ao realizar o cadastro. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
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
          <h1>Cadastro</h1>

          <div className="input-field">
            <FaUser className="icon-left" />
            <input type="text" placeholder="Nome completo" required onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="input-field">
            <FaUser className="icon-left" />
            <input type="text" placeholder="Matrícula Institucional" required onChange={(e) => setMatricula(e.target.value)} />
          </div>
          <div className="input-field">
            <FaUser className="icon-left" />
            <input type="email" placeholder="E-mail Institucional" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <FaUser className="icon-left" />
            <input type="date" required onChange={(e) => setDataNascimento(e.target.value)} />
          </div>
          <div className="input-field">
            <FaLock className="icon-left" />
            <input type={showSenha ? "text" : "password"} placeholder="Senha" required onChange={(e) => setSenha(e.target.value)} />
            {showSenha ? <FaEyeSlash className="toggle-password" onClick={() => setShowSenha(false)} /> : <FaEye className="toggle-password" onClick={() => setShowSenha(true)} />}
          </div>
          <div className="input-field">
            <FaLock className="icon-left" />
            <input type={showConfirmarSenha ? "text" : "password"} placeholder="Confirmar Senha" required onChange={(e) => setConfirmarSenha(e.target.value)} />
            {showConfirmarSenha ? <FaEyeSlash className="toggle-password" onClick={() => setShowConfirmarSenha(false)} /> : <FaEye className="toggle-password" onClick={() => setShowConfirmarSenha(true)} />}
          </div>

          {/* Mensagens de Feedback */}
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
          {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{success}</p>}

          <button type="submit" disabled={loading || success}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

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