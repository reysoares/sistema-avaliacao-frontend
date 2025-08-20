// App.jsx (VERSÃO FINAL COMPLETA)

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Páginas de Autenticação e Públicas
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import RecuperarConta from "./components/recuperacao-de-conta/RecuperarConta";

// Páginas Gerais Protegidas
import PaginaInicial from "./components/paginas/PaginaInicial";
import PaginaProfessores from "./components/paginas/PaginaProfessores";
import PaginaDisciplinas from "./components/paginas/PaginaDisciplinas";

// Páginas do Aluno
import PerfilAluno from "./components/pagina-perfil/aluno/PerfilAluno";

// Páginas do Professor
import PerfilProfessor from "./components/pagina-perfil/professor/PerfilProfessor";

// Páginas do Administrador
import Dashboard from "./components/paginas/Dashboard";
import GerenciarCursos from "./components/Gerenciar/GerenciarCursos";
import GerenciarDisciplinas from "./components/Gerenciar/GerenciarDisciplinas";
import PerfilAdministrador from "./components/pagina-perfil/administrador/PerfilAdministrador";

// Utilitários e Contexto
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

            {/* Rotas Protegidas Gerais */}
            <Route path="/inicial" element={<ProtectedRoute><PaginaInicial /></ProtectedRoute>} />
            <Route path="/professores" element={<ProtectedRoute><PaginaProfessores /></ProtectedRoute>} />
            <Route path="/disciplinas" element={<ProtectedRoute><PaginaDisciplinas /></ProtectedRoute>} />
            
    
            {/* Rotas de Administrador */}
            <Route path="/administrador/dashboard" element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']}><Dashboard /></ProtectedRoute>} />
            <Route path="/administrador/cursos" element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']}><GerenciarCursos /></ProtectedRoute>} />
            <Route path="/administrador/disciplinas" element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']}><GerenciarDisciplinas /></ProtectedRoute>} />

            {/* Rotas de Perfil */}
            <Route path="/perfil/aluno" element={<ProtectedRoute><PerfilAluno /></ProtectedRoute>} />
            <Route path="/perfil/professor" element={<ProtectedRoute><PerfilProfessor /></ProtectedRoute>} />
            <Route path="/perfil/administrador" element={<ProtectedRoute><PerfilAdministrador /></ProtectedRoute>} />

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