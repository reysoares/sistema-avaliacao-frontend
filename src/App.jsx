import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Cadastro from "./components/cadastro/Cadastro";
import RecuperarConta from "./components/recuperacao-de-conta/RecuperarConta";
import PaginaInicial from "./components/paginas/PaginaInicial";
import PaginaProfessores from "./components/paginas/PaginaProfessores";
import PaginaDisciplinas from "./components/paginas/PaginaDisciplinas";
import Dashboard from "./components/paginas/Dashboard";
import PerfilAluno from "./components/pagina-perfil/aluno/PerfilAluno";
import PerfilProfessor from "./components/pagina-perfil/professor/PerfilProfessor";
import PerfilAdministrador from "./components/pagina-perfil/administrador/PerfilAdministrador";
import GerenciarCursos from "./components/Gerenciar/GerenciarCursos";
import GerenciarDisciplinas from "./components/Gerenciar/GerenciarDisciplinas";

function App() {
  return (
    <div className="App">
      {" "}
      {/* <-- adiciona essa div */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-conta" element={<RecuperarConta />} />
          <Route path="/inicial" element={<PaginaInicial />} />
          <Route path="/professores" element={<PaginaProfessores />} />
          <Route path="/disciplinas" element={<PaginaDisciplinas />} />
          <Route path="/administrador/dashboard" element={<Dashboard />} />
          <Route path="/administrador/cursos" element={<GerenciarCursos />} />
          <Route path="/administrador/disciplinas" element={<GerenciarDisciplinas />} />
          <Route path="/perfil/aluno" element={<PerfilAluno />} />
          <Route path="/perfil/professor" element={<PerfilProfessor />} />
          <Route
            path="/perfil/administrador"
            element={<PerfilAdministrador />}
          />
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* redireciona root para login */}
          <Route path="*" element={<Navigate to="/login" />} /> {/* fallback */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
