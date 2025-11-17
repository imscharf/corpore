import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import exameService from '../services/exameService';

const ViewExame = () => {
  const { id } = useParams(); // Pega o ID do exame da URL
  const [exame, setExame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExame = async () => {
      try {
        const data = await exameService.getExameById(id);
        setExame(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar detalhes do exame.');
        console.error(err);
        setLoading(false);
      }
    };
    fetchExame();
  }, [id]);

  const handleLiberarLaudo = async () => {
    if (window.confirm('Deseja realmente liberar este laudo para o atleta?')) {
      try {
        const updatedExame = await exameService.updateExame(id, { laudoLiberado: true, status: 'Liberado' });
        setExame(updatedExame);
        alert('Laudo liberado com sucesso!');
      } catch (err) {
        console.error('Erro ao liberar laudo:', err);
        alert('Erro ao liberar laudo.');
      }
    }
  };

  if (loading) return <div>Carregando detalhes do exame...</div>;
  if (error) return <div>{error}</div>;
  if (!exame) return <div>Exame não encontrado.</div>;

  // Helper para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Helper para formatar data e hora
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div>
      <h2>Detalhes do Exame ({exame.tipoExame})</h2>

      {/* Abas - Faremos simples por enquanto */}
      <div className="tabs-container">
        <button className="tab-button active">Dados do Atleta</button>
        <button className="tab-button">Anamnese</button>
        <button className="tab-button">Diagnóstico</button>
        <button className="tab-button">Histórico</button>
        <button className="tab-button">Laudo</button>
      </div>

      {/* Conteúdo da aba "Dados do Atleta" (Pág 5 do PDF) */}
      <div className="tab-content">
        <h3>Dados do Atleta</h3>
        <div className="data-grid">
          <div className="data-item"><strong>Nome:</strong> {exame.atleta?.nome}</div>
          <div className="data-item"><strong>Sexo:</strong> {exame.atleta?.sexo}</div>
          <div className="data-item"><strong>Data Nasc.:</strong> {formatDate(exame.atleta?.dataNascimento)}</div>
          <div className="data-item"><strong>Equipe:</strong> {exame.atleta?.equipe || 'N/A'}</div>
          <div className="data-item"><strong>UF:</strong> {exame.atleta?.uf || 'N/A'}</div>
          <div className="data-item"><strong>RG:</strong> {exame.atleta?.rg || 'N/A'}</div>
          <div className="data-item"><strong>CPF:</strong> {exame.atleta?.cpf}</div>
          <div className="data-item"><strong>Peso:</strong> {exame.atleta?.peso ? `${exame.atleta.peso} kg` : 'N/A'}</div>
          <div className="data-item"><strong>Altura:</strong> {exame.atleta?.altura ? `${exame.atleta.altura} m` : 'N/A'}</div>
          <div className="data-item"><strong>Email:</strong> {exame.atleta?.email}</div>
          <div className="data-item"><strong>Telefone:</strong> {exame.atleta?.telefone || 'N/A'}</div>
          <div className="data-item"><strong>Horas Treino:</strong> {exame.atleta?.horasTreinamento || 'N/A'}</div>
          <div className="data-item"><strong>Início Carreira:</strong> {formatDate(exame.atleta?.inicioCarreira)}</div>
          <div className="data-item full-width"><strong>Histórico Lesões:</strong> {exame.atleta?.historicoLesoes || 'N/A'}</div>
          <div className="data-item full-width"><strong>Tratamentos Realizados:</strong> {exame.atleta?.tratamentosRealizados || 'N/A'}</div>
        </div>
      </div>

      {/* Aba de Laudo (Pág 6 do PDF) */}
      <div className="tab-content" style={{ marginTop: '30px' }}>
        <h3>Laudo do Exame</h3>
        {exame.resultado ? (
          <div>
            <p>Laudo disponível:</p>
            {/* Aqui você pode renderizar o PDF ou um link para download */}
            <a href={exame.resultado} target="_blank" rel="noopener noreferrer">Visualizar Laudo (PDF)</a>
            <p>Status: {exame.laudoLiberado ? 'Liberado' : 'Não Liberado'}</p>
          </div>
        ) : (
          <p>Nenhum laudo disponível ainda.</p>
        )}
        {!exame.laudoLiberado && (
          <button onClick={handleLiberarLaudo}>Liberar Laudo</button>
        )}
      </div>

      {/* As abas de Anamnese, Diagnóstico, Histórico exigiriam mais lógica
          para buscar os dados relacionados e renderizá-los aqui,
          mas o padrão seria semelhante ao "Dados do Atleta". */}
    </div>
  );
};

export default ViewExame;