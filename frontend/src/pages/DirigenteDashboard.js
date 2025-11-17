import React, { useState, useEffect } from 'react';
import atletaService from '../services/atletaService';
import fisioterapeutaService from '../services/fisioterapeutaService';
import agendamentoService from '../services/agendamentoService';
import exameService from '../services/exameService';

const DirigenteDashboard = () => {
  const [activeTab, setActiveTab] = useState('cadastro'); // 'cadastro', 'agendamentos', 'exames'
  const [atletas, setAtletas] = useState([]);
  const [fisioterapeutas, setFisioterapeutas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Forms de cadastro (Atleta e Fisioterapeuta)
  const [atletaFormData, setAtletaFormData] = useState({
    nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
    peso: '', altura: '', email: '', telefone: '', horasTreinamento: '', inicioCarreira: '',
    historicoLesoes: '', tratamentosRealizados: '',
  });
  const [fisioterapeutaFormData, setFisioterapeutaFormData] = useState({
    nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
    email: '', telefone: '', crefito: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [atletasData, fisiosData, agendamentosData, examesData] = await Promise.all([
          atletaService.getAtletas(),
          fisioterapeutaService.getFisioterapeutas(),
          agendamentoService.getAgendamentos(),
          exameService.getExames(),
        ]);
        setAtletas(atletasData);
        setFisioterapeutas(fisiosData);
        setAgendamentos(agendamentosData);
        setExames(examesData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do dirigente.');
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAtletaFormChange = (e) => {
    setAtletaFormData({ ...atletaFormData, [e.target.name]: e.target.value });
  };

  const handleFisioterapeutaFormChange = (e) => {
    setFisioterapeutaFormData({ ...fisioterapeutaFormData, [e.target.name]: e.target.value });
  };

  const handleAtletaSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...atletaFormData,
        dataNascimento: atletaFormData.dataNascimento ? new Date(atletaFormData.dataNascimento) : undefined,
        inicioCarreira: atletaFormData.inicioCarreira ? new Date(atletaFormData.inicioCarreira) : undefined,
      };
      await atletaService.createAtleta(dataToSend);
      alert('Atleta cadastrado com sucesso!');
      setAtletaFormData({
        nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
        peso: '', altura: '', email: '', telefone: '', horasTreinamento: '', inicioCarreira: '',
        historicoLesoes: '', tratamentosRealizados: '',
      });
      const updatedAtletas = await atletaService.getAtletas();
      setAtletas(updatedAtletas);
    } catch (err) {
      console.error('Erro ao cadastrar atleta:', err);
      alert('Erro ao cadastrar atleta.');
    }
  };

  const handleFisioterapeutaSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...fisioterapeutaFormData,
        dataNascimento: fisioterapeutaFormData.dataNascimento ? new Date(fisioterapeutaFormData.dataNascimento) : undefined,
      };
      await fisioterapeutaService.createFisioterapeuta(dataToSend);
      alert('Fisioterapeuta cadastrado com sucesso!');
      setFisioterapeutaFormData({
        nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
        email: '', telefone: '', crefito: '',
      });
      const updatedFisioterapeutas = await fisioterapeutaService.getFisioterapeutas();
      setFisioterapeutas(updatedFisioterapeutas);
    } catch (err) {
      console.error('Erro ao cadastrar fisioterapeuta:', err);
      alert('Erro ao cadastrar fisioterapeuta.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleDownloadLaudo = (exame) => {
    if (exame.resultado) {
      window.open(exame.resultado, '_blank');
    } else {
      alert('Laudo não disponível para download.');
    }
  };


  if (loading) return <div>Carregando dashboard do dirigente...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard do Dirigente</h1>

      <div className="tab-buttons">
        <button className={activeTab === 'cadastro' ? 'active' : ''} onClick={() => setActiveTab('cadastro')}>
          Cadastro
        </button>
        <button className={activeTab === 'agendamentos' ? 'active' : ''} onClick={() => setActiveTab('agendamentos')}>
          Agendamentos
        </button>
        <button className={activeTab === 'exames' ? 'active' : ''} onClick={() => setActiveTab('exames')}>
          Exames
        </button>
      </div>

      {activeTab === 'cadastro' && (
        <div className="tab-content">
          <h3>Cadastrar Atleta</h3>
          <form onSubmit={handleAtletaSubmit}>
            <div className="form-group"><label>Nome:</label><input type="text" name="nome" value={atletaFormData.nome} onChange={handleAtletaFormChange} required /></div>
            <div className="form-group"><label>Sexo:</label>
              <select name="sexo" value={atletaFormData.sexo} onChange={handleAtletaFormChange} required>
                <option value="Masculino">Masculino</option><option value="Feminino">Feminino</option><option value="Outro">Outro</option>
              </select>
            </div>
            <div className="form-group"><label>Data de Nascimento:</label><input type="date" name="dataNascimento" value={atletaFormData.dataNascimento} onChange={handleAtletaFormChange} required /></div>
            <div className="form-group"><label>Equipe:</label><input type="text" name="equipe" value={atletaFormData.equipe} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>UF:</label><input type="text" name="uf" value={atletaFormData.uf} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>RG:</label><input type="text" name="rg" value={atletaFormData.rg} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>CPF:</label><input type="text" name="cpf" value={atletaFormData.cpf} onChange={handleAtletaFormChange} required /></div>
            <div className="form-group"><label>Peso:</label><input type="number" name="peso" value={atletaFormData.peso} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>Altura:</label><input type="number" name="altura" value={atletaFormData.altura} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>E-mail:</label><input type="email" name="email" value={atletaFormData.email} onChange={handleAtletaFormChange} required /></div>
            <div className="form-group"><label>Telefone:</label><input type="text" name="telefone" value={atletaFormData.telefone} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>Horas Treinamento:</label><input type="number" name="horasTreinamento" value={atletaFormData.horasTreinamento} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>Início da carreira:</label><input type="date" name="inicioCarreira" value={atletaFormData.inicioCarreira} onChange={handleAtletaFormChange} /></div>
            <div className="form-group"><label>Histórico de Lesões:</label><textarea name="historicoLesoes" value={atletaFormData.historicoLesoes} onChange={handleAtletaFormChange}></textarea></div>
            <div className="form-group"><label>Tratamentos já realizados:</label><textarea name="tratamentosRealizados" value={atletaFormData.tratamentosRealizados} onChange={handleAtletaFormChange}></textarea></div>
            <button type="submit">Salvar Atleta</button>
          </form>

          <h3 style={{ marginTop: '40px' }}>Cadastrar Fisioterapeuta</h3>
          <form onSubmit={handleFisioterapeutaSubmit}>
            <div className="form-group"><label>Nome:</label><input type="text" name="nome" value={fisioterapeutaFormData.nome} onChange={handleFisioterapeutaFormChange} required /></div>
            <div className="form-group"><label>Sexo:</label>
              <select name="sexo" value={fisioterapeutaFormData.sexo} onChange={handleFisioterapeutaFormChange} required>
                <option value="Masculino">Masculino</option><option value="Feminino">Feminino</option><option value="Outro">Outro</option>
              </select>
            </div>
            <div className="form-group"><label>Data de Nascimento:</label><input type="date" name="dataNascimento" value={fisioterapeutaFormData.dataNascimento} onChange={handleFisioterapeutaFormChange} required /></div>
            <div className="form-group"><label>Equipe:</label><input type="text" name="equipe" value={fisioterapeutaFormData.equipe} onChange={handleFisioterapeutaFormChange} /></div>
            <div className="form-group"><label>UF:</label><input type="text" name="uf" value={fisioterapeutaFormData.uf} onChange={handleFisioterapeutaFormChange} /></div>
            <div className="form-group"><label>RG:</label><input type="text" name="rg" value={fisioterapeutaFormData.rg} onChange={handleFisioterapeutaFormChange} /></div>
            <div className="form-group"><label>CPF:</label><input type="text" name="cpf" value={fisioterapeutaFormData.cpf} onChange={handleFisioterapeutaFormChange} required /></div>
            <div className="form-group"><label>E-mail:</label><input type="email" name="email" value={fisioterapeutaFormData.email} onChange={handleFisioterapeutaFormChange} required /></div>
            <div className="form-group"><label>Telefone:</label><input type="text" name="telefone" value={fisioterapeutaFormData.telefone} onChange={handleFisioterapeutaFormChange} /></div>
            <div className="form-group"><label>CREFITO:</label><input type="text" name="crefito" value={fisioterapeutaFormData.crefito} onChange={handleFisioterapeutaFormChange} required /></div>
            <button type="submit">Salvar Fisioterapeuta</button>
          </form>
        </div>
      )}

      {activeTab === 'agendamentos' && (
        <div className="tab-content">
          <h3>Consultas Agendadas</h3>
          <table>
            <thead>
              <tr>
                <th>Atendimento</th>
                <th>Atleta</th>
                <th>Fisioterapeuta</th>
                <th>Data da Consulta</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agendamento) => (
                <tr key={agendamento._id}>
                  <td>{agendamento._id.slice(-6)}</td>
                  <td>{agendamento.atleta?.nome || 'N/A'}</td>
                  <td>{agendamento.fisioterapeuta?.nome || 'N/A'}</td>
                  <td>{formatDate(agendamento.dataConsulta)}</td>
                  <td>{agendamento.horarioConsulta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'exames' && (
        <div className="tab-content">
          <h3>Laudos Liberados (Exames)</h3>
          <table>
            <thead>
              <tr>
                <th>Atendimento</th>
                <th>Atleta</th>
                <th>Exame</th>
                <th>Status</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {exames.filter(ex => ex.laudoLiberado).map((exame) => (
                <tr key={exame._id}>
                  <td>{exame._id.slice(-6)}</td>
                  <td>{exame.atleta?.nome || 'N/A'}</td>
                  <td>{exame.tipoExame}</td>
                  <td>{exame.status}</td>
                  <td>
                    <button onClick={() => handleDownloadLaudo(exame)}>
                      Abrir PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DirigenteDashboard;