import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import exameService from '../services/exameService';

const ExamesList = () => {
  const [exames, setExames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExames = async () => {
      try {
        const data = await exameService.getExames();
        setExames(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExames();
  }, []);

  return (
    <div>
      <h2>Exames Registrados</h2>

      {/* Botão alinhado à esquerda e verde */}
      <div className="action-buttons">
        <button className="btn btn-success" onClick={() => navigate('/exames/novo')}>
          + Novo Exame
        </button>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Atleta</th>
              <th>Tipo de Exame</th>
              <th>Status</th>
              <th>Resultado</th>
              <th style={{textAlign: 'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {exames.map((exame) => (
              <tr key={exame._id}>
                <td>{new Date(exame.dataExame).toLocaleDateString('pt-BR')}</td>
                <td>{exame.atleta ? exame.atleta.nome : 'N/A'}</td>
                <td>{exame.tipoExame}</td>
                <td>
                  {/* Pequena formatação condicional de status se desejar */}
                  <span style={{
                    fontWeight: 'bold', 
                    color: exame.status === 'Liberado' ? '#28a745' : '#e67e22'
                  }}>
                    {exame.status}
                  </span>
                </td>
                <td>{exame.laudoLiberado ? 'Disponível' : 'Pendente'}</td>
                <td style={{textAlign: 'center'}}>
                  {/* Botão "Abrir" explícito */}
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/exames/${exame._id}`)}
                  >
                    Abrir
                  </button>
                </td>
              </tr>
            ))}
            {exames.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                  Nenhum exame registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamesList;