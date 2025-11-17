import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaStethoscope, FaChartBar, FaUserTie } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Corpore</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <FaChartBar /> Dashboard Fisioterapeuta
          </Link>
        </li>
        <li>
          <Link to="/atleta">
            <FaUser /> Dashboard Atleta
          </Link>
        </li>
        <li>
          <Link to="/dirigente">
            <FaUserTie /> Dashboard Dirigente
          </Link>
        </li>

        <li className="menu-group">
          <FaUser /> Cadastro
          <ul>
            <li><Link to="/cadastro/atleta">Atleta</Link></li>
            <li><Link to="/cadastro/diagnostico">Diagnóstico</Link></li>
            <li><Link to="/cadastro/anamnese">Anamnese</Link></li>
            {/* Poderia ter cadastro de Fisioterapeuta e Dirigente aqui também se necessário */}
          </ul>
        </li>
        <li>
          <Link to="/agendamentos">
            <FaCalendarAlt /> Agendamentos
          </Link>
        </li>
        <li>
          <Link to="/exames">
            <FaStethoscope /> Exames
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;