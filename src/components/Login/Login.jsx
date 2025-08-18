// src/components/Login/Login.jsx
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/avaliacaoLogo.svg";
import { useAuth } from '../../hooks/useAuth.js';
import fundo from "../../assets/fundo.png";
import "@styles/FormularioBase.css";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // <-- Obtenha a função de login do contexto
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(matricula, senha);
    } catch (err) { // <-- A variável 'err'
      console.error("Erro de login:", err); // <-- ADICIONE ESTA LINHA
      setError("Matrícula ou senha inválida. Tente novamente.");
      setLoading(false);
    }
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
          <h1>Login</h1>
          <div className="input-field">
            <FaUser className="icon-left" />
            <input
              type="text" // <-- Corrigido de "matricula" para "text"
              placeholder="Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <FaLock className="icon-left" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="toggle-password"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="toggle-password"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <div className="recall-forget">
            <Link to="/recuperar-conta">Esqueceu a senha ou usuário?</Link>
          </div>

          {/* Exibe mensagem de erro se houver */}
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
          
          {/* O botão agora é do tipo "submit" e não tem mais o Link */}
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="signup-link">
            <p>
              Não tem uma conta? <Link to="/cadastro">Cadastrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;