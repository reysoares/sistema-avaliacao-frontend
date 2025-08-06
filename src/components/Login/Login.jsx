import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/avaliacaoLogo.svg";
import fundo from "../../assets/fundo.png";
import "@styles/FormularioBase.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Envio");
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
              type="matricula"
              placeholder="Matrícula"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaLock className="icon-left" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
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

          <Link to="/inicial">
            <button type="button">Entrar</button>
          </Link>

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
