import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FisioterapeutaDashboard from './pages/FisioterapeutaDashboard';
import AtletaDashboard from './pages/AtletaDashboard'; // Nova Dashboard
import DirigenteDashboard from './pages/DirigenteDashboard'; // Nova Dashboard
import CadastroAtleta from './pages/CadastroAtleta';
import CadastroDiagnostico from './pages/CadastroDiagnostico';
import CadastroAnamnese from './pages/CadastroAnamnese';
import AgendamentosList from './pages/AgendamentosList';
import ExamesList from './pages/ExamesList';
import ViewExame from './pages/ViewExame';

import './App.css';
import './Sidebar.css';
import './Forms.css'; // Novo arquivo de estilos para formulários e tabelas
import './Tabs.css'; // Novo arquivo de estilos para abas

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            {/* Rota padrão para Fisioterapeuta */}
            <Route path="/" element={<FisioterapeutaDashboard />} />

            {/* Rotas de Cadastro (Fisioterapeuta e Dirigente) */}
            <Route path="/cadastro/atleta" element={<CadastroAtleta />} />
            <Route path="/cadastro/diagnostico" element={<CadastroDiagnostico />} />
            <Route path="/cadastro/anamnese" element={<CadastroAnamnese />} />
            {/* Agendamentos e Exames (Fisioterapeuta) */}
            <Route path="/agendamentos" element={<AgendamentosList />} />
            <Route path="/exames" element={<ExamesList />} />
            <Route path="/exames/:id" element={<ViewExame />} />

            {/* Dashboards para outros tipos de usuário */}
            <Route path="/atleta" element={<AtletaDashboard />} />
            <Route path="/dirigente" element={<DirigenteDashboard />} />

            {/* Adicione uma rota para 404 Not Found se desejar */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;