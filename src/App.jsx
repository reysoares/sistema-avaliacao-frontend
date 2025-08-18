import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
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
import ProtectedRoute from "./components/utilitarios/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-conta" element={<RecuperarConta />} />

            {/* Rotas Protegidas */}
            <Route path="/inicial" element={<ProtectedRoute><PaginaInicial /></ProtectedRoute>} />
            <Route path="/professores" element={<ProtectedRoute><PaginaProfessores /></ProtectedRoute>} />
            <Route path="/disciplinas" element={<ProtectedRoute><PaginaDisciplinas /></ProtectedRoute>} />
            <Route path="/administrador/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* ... proteja as outras rotas da mesma forma ... */}
            <Route path="/perfil/aluno" element={<ProtectedRoute><PerfilAluno /></ProtectedRoute>} />


            {/* Redirecionamentos */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
