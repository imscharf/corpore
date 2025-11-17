import React, { useState, useEffect } from 'react';
import agendamentoService from '../services/agendamentoService';
import atletaService from '../services/atletaService';
import fisioterapeutaService from '../services/fisioterapeutaService';

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [atletas, setAtletas] = useState([]);
  const [fisioterapeutas, setFisioterapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form para "Nova consulta"
  const [newAgendamento, setNewAgendamento] = useState({
    atleta: '',
    fisioterapeuta: '',
    dataConsulta: '',
    horarioConsulta: '',
    tipoConsulta: '',
    observacoes: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agendamentosData, atletasData, fisioterapeutasData] = await Promise.all([
          agendamentoService.getAgendamentos(),
          atletaService.getAtletas(),
          fisioterapeutaService.getFisioterapeutas(),
        ]);
        setAgendamentos(agendamentosData);
        setAtletas(atletasData);
        setFisioterapeutas(fisioterapeutasData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados.');
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewAgendamentoChange = (e) => {
    setNewAgendamento({ ...newAgendamento, [e.target.name]: e.target.value });
  };

  const handleNewAgendamentoSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...newAgendamento,
        dataConsulta: newAgendamento.dataConsulta ? new Date(newAgendamento.dataConsulta) : undefined,
      };
      await agendamentoService.createAgendamento(dataToSend);
      alert('Agendamento criado com sucesso!');
      // Atualizar a lista de agendamentos
      const updatedAgendamentos = await agendamentoService.getAgendamentos();
      setAgendamentos(updatedAgendamentos);
      // Resetar formulário
      setNewAgendamento({
        atleta: '', fisioterapeuta: '', dataConsulta: '', horarioConsulta: '', tipoConsulta: '', observacoes: '',
      });
    } catch (err) {
      console.error('Erro ao criar agendamento:', err);
      alert('Erro ao criar agendamento. Verifique o console.');
    }
  };

  if (loading) return <div>Carregando agendamentos...</div>;
  if (error) return <div>{error}</div>;

  // Função auxiliar para formatar datas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div>
      <h2>Agendamentos</h2>

      {/* Seção Nova Consulta */}
      <h3>Nova Consulta</h3>
      <form onSubmit={handleNewAgendamentoSubmit}>
        <div className="form-group">
          <label>Atleta:</label>
          <select name="atleta" value={newAgendamento.atleta} onChange={handleNewAgendamentoChange} required>
            <option value="">Selecione um Atleta</option>
            {atletas.map((atleta) => (
              <option key={atleta._id} value={atleta._id}>
                {atleta.nome} ({atleta.cpf})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fisioterapeuta:</label>
          <select name="fisioterapeuta" value={newAgendamento.fisioterapeuta} onChange={handleNewAgendamentoChange} required>
            <option value="">Selecione um Fisioterapeuta</option>
            {fisioterapeutas.map((fisio) => (
              <option key={fisio._id} value={fisio._id}>
                {fisio.nome} (CREFITO: {fisio.crefito})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data da Consulta:</label>
          <input type="date" name="dataConsulta" value={newAgendamento.dataConsulta} onChange={handleNewAgendamentoChange} required />
        </div>
        <div className="form-group">
          <label>Horário da Consulta:</label>
          <input type="time" name="horarioConsulta" value={newAgendamento.horarioConsulta} onChange={handleNewAgendamentoChange} required />
        </div>
        <div className="form-group">
          <label>Tipo da Consulta:</label>
          <input type="text" name="tipoConsulta" value={newAgendamento.tipoConsulta} onChange={handleNewAgendamentoChange} required />
        </div>
        <div className="form-group">
          <label>Observações:</label>
          <textarea name="observacoes" value={newAgendamento.observacoes} onChange={handleNewAgendamentoChange} rows="3"></textarea>
        </div>
        <button type="submit">Agendar</button>
        <button type="button" onClick={() => setNewAgendamento({
            atleta: '', fisioterapeuta: '', dataConsulta: '', horarioConsulta: '', tipoConsulta: '', observacoes: '',
          })}>Cancelar</button>
      </form>

      {/* Seção Agenda - Consultas Agendadas */}
      <h3 style={{ marginTop: '40px' }}>Consultas Agendadas</h3>
      <table>
        <thead>
          <tr>
            <th>Atendimento</th>
            <th>Atleta</th>
            <th>Fisioterapeuta</th>
            <th>Data da Consulta</th>
            <th>Horário</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento._id}>
              <td>{agendamento._id.slice(-6)}</td> {/* ID curto para exibição */}
              <td>{agendamento.atleta ? agendamento.atleta.nome : 'N/A'}</td>
              <td>{agendamento.fisioterapeuta ? agendamento.fisioterapeuta.nome : 'N/A'}</td>
              <td>{formatDate(agendamento.dataConsulta)}</td>
              <td>{agendamento.horarioConsulta}</td>
              <td>{agendamento.tipoConsulta}</td>
              <td>
                <button onClick={() => alert(`Detalhes do agendamento ${agendamento._id}`)}>Ver</button>
                {/* Implementar edição e exclusão */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgendamentosList;