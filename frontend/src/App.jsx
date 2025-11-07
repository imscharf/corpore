import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CadastroAtleta from "./pages/CadastroAtleta";
import CadastroFisio from "./pages/CadastroFisio";
import CadastroDiagnostico from "./pages/CadastroDiagnostico";
import NovoAgendamento from "./pages/NovoAgendamento";
import ListaAgendamentos from "./pages/ListaAgendamentos";
import ListaExames from "./pages/ListaExames";
import DetalhesExame from "./pages/DetalhesExame";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/atletas" element={<CadastroAtleta />} />
            <Route path="/fisios" element={<CadastroFisio />} />
            <Route path="/diagnosticos" element={<CadastroDiagnostico />} />
            <Route path="/agendamento" element={<NovoAgendamento />} />
            <Route path="/consultas" element={<ListaAgendamentos />} />
            <Route path="/exames" element={<ListaExames />} />
            <Route path="/exames/:id" element={<DetalhesExame />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}