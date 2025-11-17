import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import exameService from '../services/exameService'; // Crie este serviço

const ExamesList = () => {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExames = async () => {
      try {
        // Por enquanto, busca todos os exames. Em um cenário real, filtraria por atleta.
        const data = await exameService.getExames();
        setExames(data);
      } catch (err) {
        setError('Erro ao carregar exames.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExames();
  }, []);

  if (loading) return <div>Carregando exames...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Listagem de Exames</h2>
      <table>
        <thead>
          <tr>
            <th>Atendimento</th>
            <th>Atleta</th>
            <th>Exame</th>
            <th>Status</th>
            <th>Resultado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exames.map((exame) => (
            <tr key={exame._id}>
              <td>{exame._id.slice(-6)}</td> {/* Simula um número de atendimento */}
              <td>{exame.atleta ? exame.atleta.nome : 'N/A'}</td> {/* Popule o atleta no backend */}
              <td>{exame.tipoExame}</td>
              <td>{exame.status}</td>
              <td>{exame.laudoLiberado ? 'Liberado' : 'Em Andamento'}</td>
              <td>
                <Link to={`/exames/${exame._id}`}>Abrir</Link>
                {exame.laudoLiberado && (
                  <button onClick={() => alert('Download do laudo (em desenvolvimento)')}>
                    Baixar PDF
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamesList;