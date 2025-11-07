import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Sistema Fisio</h1>
      <nav className="flex flex-col space-y-3">
        <Link to="/atletas" className="hover:text-blue-300">Cadastro Atleta</Link>
        <Link to="/fisios" className="hover:text-blue-300">Cadastro Fisioterapeuta</Link>
        <Link to="/diagnosticos" className="hover:text-blue-300">Cadastro Diagnóstico</Link>
        <Link to="/agendamento" className="hover:text-blue-300">Novo Agendamento</Link>
        <Link to="/consultas" className="hover:text-blue-300">Consultas</Link>
        <Link to="/exames" className="hover:text-blue-300">Exames</Link>
      </nav>
    </div>
  );
}