import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AccessibilityBar from './components/AccessibilityBar'; // Importação nova
import AtletaList from './pages/AtletaList';
import AtletaForm from './pages/AtletaForm.js';
import ExamesList from './pages/ExamesList';
import ViewExame from './pages/ViewExame';
import './App.css';
import './Forms.css';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="app-container">
        {/* Acessibilidade 4: Link Pular para Conteúdo */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>

        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="content" id="main-content" tabIndex="-1">
          {/* Acessibilidades 2 e 3: Barra de Ferramentas */}
          <AccessibilityBar />

          <Routes>
            <Route path="/" element={<Navigate to="/cadastro/atleta" replace />} />
            
            <Route path="/cadastro/atleta" element={<AtletaList />} />
            <Route path="/cadastro/atleta/novo" element={<AtletaForm />} />
            <Route path="/cadastro/atleta/:id" element={<AtletaForm />} />

            <Route path="/cadastro/fisioterapeuta" element={<div><h2>Cadastro de Fisioterapeuta</h2><p>Funcionalidade indisponível no momento.</p></div>} />
            <Route path="/agendamentos" element={<div><h2>Agendamentos</h2><p>Funcionalidade indisponível no momento.</p></div>} />

            <Route path="/exames" element={<ExamesList />} />
            <Route path="/exames/novo" element={<ViewExame mode="create" />} />
            <Route path="/exames/:id" element={<ViewExame mode="view" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;