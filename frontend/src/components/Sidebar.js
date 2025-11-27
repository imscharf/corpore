import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaCalendarAlt, 
  FaStethoscope, 
  FaSignOutAlt, 
  FaMoon, 
  FaSun, 
  FaChevronDown, 
  FaChevronUp 
} from 'react-icons/fa';
import '../Sidebar.css';

const Sidebar = ({ theme, toggleTheme }) => {
  const [cadastroOpen, setCadastroOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout aqui
    alert("Saindo do sistema...");
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        CORPORE
      </div>
      
      <ul className="sidebar-menu">
        {/* Menu Cadastro com Submenu */}
        <li>
          <div className="menu-group-label" onClick={() => setCadastroOpen(!cadastroOpen)}>
            <FaUserPlus /> 
            <span style={{flexGrow: 1}}>Cadastro</span>
            {cadastroOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
          </div>
          {cadastroOpen && (
            <ul className="submenu">
              <li>
                <Link to="/cadastro/atleta">Atleta</Link>
              </li>
              <li>
                <Link to="/cadastro/fisioterapeuta">Fisioterapeuta</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Agendamentos */}
        <li>
          <Link to="/agendamentos">
            <FaCalendarAlt /> Agendamentos
          </Link>
        </li>

        {/* Exames */}
        <li>
          <Link to="/exames">
            <FaStethoscope /> Exames
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="footer-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
          {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </button>
        <button className="footer-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;