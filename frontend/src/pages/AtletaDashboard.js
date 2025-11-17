import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import exameService from '../services/exameService';

const AtletaDashboard = () => {
  const [meusExames, setMeusExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOTA: Em um sistema real com autenticação, o ID do atleta viria do contexto de usuário logado.
  // Por simplicidade, vamos buscar todos e filtrar, ou simular um atleta ID.
  const atletaIdSimulado = 'ID_DO_ATLETA_AQUI'; // Substitua por um ID real de um atleta no seu DB para testar

  useEffect(() => {
    const fetchMeusExames = async () => {
      try {
        const allExames = await exameService.getExames();
        // Filtrar exames apenas para o atleta simulado, e que estejam liberados
        const filteredExames = allExames.filter(
          (ex) => ex.atleta?._id === atletaIdSimulado && ex.laudoLiberado
        );
        setMeusExames(filteredExames);
      } catch (err) {
        setError('Erro ao carregar seus exames.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (atletaIdSimulado !== 'ID_DO_ATLETA_AQUI') {
      fetchMeusExames();
    } else {
      setError('Por favor, defina um ID de atleta válido para simular.');
      setLoading(false);
    }
  }, [atletaIdSimulado]);

  const handleDownloadLaudo = (exame) => {
    if (exame.resultado) {
      // Abre o PDF em uma nova aba para visualização/download
      window.open(exame.resultado, '_blank');
    } else {
      alert('Laudo não disponível para download.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) return <div>Carregando seus exames...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Meus Exames</h1>
      {meusExames.length === 0 ? (
        <p>Você ainda não tem exames liberados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Exame</th>
              <th>Data do Exame</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {meusExames.map((exame) => (
              <tr key={exame._id}>
                <td>{exame._id.slice(-6)}</td>
                <td>{exame.tipoExame}</td>
                <td>{formatDate(exame.dataExame)}</td>
                <td>{exame.status}</td>
                <td>
                  <button onClick={() => handleDownloadLaudo(exame)}>
                    Baixar Laudo (PDF)
                  </button>
                  {/* Poderia ter uma rota para visualizar detalhes do exame também */}
                  {/* <Link to={`/exames/${exame._id}`}>Ver Detalhes</Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AtletaDashboard;