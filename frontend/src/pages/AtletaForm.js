import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import atletaService from '../services/atletaService';
import exameService from '../services/exameService';

const AtletaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nome: '', cpf: '', dataNascimento: '', sexo: 'Masculino',
    endereco: '', uf: '', email: '', telefone: '',
    equipe: '', peso: '', altura: '',
    inicioCarreira: '', horasTreinamento: '',
    // Agora são Arrays
    historicoLesoes: [], 
    tratamentosRealizados: []
  });

  const [atletaExames, setAtletaExames] = useState([]);

  // Função para formatar CPF
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Impede que sejam digitados mais de 11 dígitos
  };

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const atleta = await atletaService.getAtletaById(id);
          
          // Formatação de datas simples
          if(atleta.dataNascimento) atleta.dataNascimento = new Date(atleta.dataNascimento).toISOString().split('T')[0];
          if(atleta.inicioCarreira) atleta.inicioCarreira = new Date(atleta.inicioCarreira).toISOString().split('T')[0];
          
          // Garantir que as listas existam
          if (!atleta.historicoLesoes) atleta.historicoLesoes = [];
          if (!atleta.tratamentosRealizados) atleta.tratamentosRealizados = [];

          // Formatar datas dentro dos arrays (para o input date)
          const lesoesFormatadas = atleta.historicoLesoes.map(l => ({
            ...l,
            dataLesao: l.dataLesao ? new Date(l.dataLesao).toISOString().split('T')[0] : ''
          }));

          const tratamentosFormatados = atleta.tratamentosRealizados.map(t => ({
            ...t,
            dataInicio: t.dataInicio ? new Date(t.dataInicio).toISOString().split('T')[0] : '',
            dataFim: t.dataFim ? new Date(t.dataFim).toISOString().split('T')[0] : ''
          }));

          setFormData({
            ...atleta,
            peso: atleta.peso || '',
            altura: atleta.altura || '',
            horasTreinamento: atleta.horasTreinamento || '',
            historicoLesoes: lesoesFormatadas,
            tratamentosRealizados: tratamentosFormatados
          });

          const allExames = await exameService.getExames();
          const filtered = allExames.filter(ex => ex.atleta && ex.atleta._id === id);
          setAtletaExames(filtered);
        } catch (error) {
          console.error("Erro ao carregar atleta", error);
        }
      };
      fetchData();
    }
  }, [id, isEdit]);

  // Manipulação de inputs simples
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cpf') {
      value = formatCPF(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  // --- Lógica para Histórico de Lesões (Lista Dinâmica) ---
  const handleLesaoChange = (index, field, value) => {
    const newLesoes = [...formData.historicoLesoes];
    newLesoes[index][field] = value;
    setFormData({ ...formData, historicoLesoes: newLesoes });
  };

  const addLesao = () => {
    setFormData({
      ...formData,
      historicoLesoes: [...formData.historicoLesoes, { tipo: '', dataLesao: '', gravidade: 'Leve', descricao: '' }]
    });
  };

  const removeLesao = (index) => {
    const newLesoes = formData.historicoLesoes.filter((_, i) => i !== index);
    setFormData({ ...formData, historicoLesoes: newLesoes });
  };

  // --- Lógica para Tratamentos (Lista Dinâmica) ---
  const handleTratamentoChange = (index, field, value) => {
    const newTratamentos = [...formData.tratamentosRealizados];
    newTratamentos[index][field] = value;
    setFormData({ ...formData, tratamentosRealizados: newTratamentos });
  };

  const addTratamento = () => {
    setFormData({
      ...formData,
      tratamentosRealizados: [...formData.tratamentosRealizados, { tipo: '', dataInicio: '', dataFim: '', descricao: '' }]
    });
  };

  const removeTratamento = (index) => {
    const newTratamentos = formData.tratamentosRealizados.filter((_, i) => i !== index);
    setFormData({ ...formData, tratamentosRealizados: newTratamentos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };
      
      const numericFields = ['peso', 'altura', 'horasTreinamento'];
      numericFields.forEach(field => {
        if (dataToSend[field] === '') delete dataToSend[field];
      });
      if (dataToSend.inicioCarreira === '') delete dataToSend.inicioCarreira;

      if (isEdit) {
        await atletaService.updateAtleta(id, dataToSend);
        alert('Atleta atualizado com sucesso!');
      } else {
        await atletaService.createAtleta(dataToSend);
        alert('Atleta cadastrado com sucesso!');
        navigate('/cadastro/atleta');
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Erro ao salvar.';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? `Editar Atleta: ${formData.nome}` : 'Novo Atleta'}</h2>
      
      <div className="action-buttons">
         <button type="submit" className="btn btn-success">Salvar</button>
         <button type="button" className="btn btn-danger" onClick={() => navigate('/cadastro/atleta')}>Cancelar</button>
      </div>

      {/* CARD 1: Informações Pessoais */}
      <div className="card">
        <h3>Informações Pessoais</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Nome:</label>
            <input className="modern-input" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input 
              className="modern-input" 
              name="cpf" 
              value={formData.cpf} 
              onChange={handleChange} 
              maxLength="14"
              placeholder="000.000.000-00"
              required 
            />
          </div>
          <div className="form-group">
            <label>Data Nascimento:</label>
            <input className="modern-input" type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sexo:</label>
            <select className="modern-input" name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className="form-group" style={{gridColumn: '1/-1'}}>
            <label>Endereço:</label>
            <input className="modern-input" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Rua, Número, Bairro" />
          </div>
          <div className="form-group">
            <label>UF:</label>
            <input className="modern-input" name="uf" value={formData.uf} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input className="modern-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Telefone:</label>
            <input className="modern-input" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Peso (kg):</label>
            <input className="modern-input" type="number" name="peso" value={formData.peso} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Altura (m):</label>
            <input className="modern-input" type="number" step="0.01" name="altura" value={formData.altura} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* CARD 2: Histórico */}
      <div className="card">
        <h3>Dados Esportivos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
           <div className="form-group">
             <label>Início da Carreira:</label>
             <input className="modern-input" type="date" name="inicioCarreira" value={formData.inicioCarreira} onChange={handleChange} />
           </div>
           <div className="form-group">
             <label>Equipe:</label>
             <input className="modern-input" name="equipe" value={formData.equipe} onChange={handleChange} />
           </div>
           <div className="form-group">
             <label>Horas Treino (sem/dia):</label>
             <input className="modern-input" type="number" name="horasTreinamento" value={formData.horasTreinamento} onChange={handleChange} />
           </div>
        </div>

        {/* --- LISTA DE LESÕES --- */}
        <h4 style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px'}}>Histórico de Lesões</h4>
        <div className="dynamic-list-container">
          {formData.historicoLesoes.map((lesao, index) => (
            <div key={index} className="sub-card">
              <div className="sub-card-header">
                <span>Lesão #{index + 1}</span>
                <button type="button" className="remove-item-btn" onClick={() => removeLesao(index)}>X</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Tipo de Lesão:</label>
                  <input className="modern-input" value={lesao.tipo} onChange={(e) => handleLesaoChange(index, 'tipo', e.target.value)} placeholder="Ex: Entorse, Fratura..." />
                </div>
                <div className="form-group">
                  <label>Data:</label>
                  <input type="date" className="modern-input" value={lesao.dataLesao} onChange={(e) => handleLesaoChange(index, 'dataLesao', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Gravidade:</label>
                  <select className="modern-input" value={lesao.gravidade} onChange={(e) => handleLesaoChange(index, 'gravidade', e.target.value)}>
                    <option value="Leve">Leve</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Grave">Grave</option>
                  </select>
                </div>
                <div className="form-group" style={{gridColumn: '1/-1'}}>
                  <label>Descritivo:</label>
                  <textarea className="modern-input" value={lesao.descricao} onChange={(e) => handleLesaoChange(index, 'descricao', e.target.value)} placeholder="Detalhes sobre a lesão..."></textarea>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="add-item-btn" onClick={addLesao}>+ Adicionar Lesão</button>
        </div>

        {/* --- LISTA DE TRATAMENTOS --- */}
        <h4 style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px'}}>Tratamentos Realizados</h4>
        <div className="dynamic-list-container">
          {formData.tratamentosRealizados.map((tratamento, index) => (
            <div key={index} className="sub-card">
              <div className="sub-card-header">
                <span>Tratamento #{index + 1}</span>
                <button type="button" className="remove-item-btn" onClick={() => removeTratamento(index)}>X</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Tipo de Tratamento:</label>
                  <input className="modern-input" value={tratamento.tipo} onChange={(e) => handleTratamentoChange(index, 'tipo', e.target.value)} placeholder="Ex: Fisioterapia, Cirurgia..." />
                </div>
                <div className="form-group">
                   {/* Espaço vazio para alinhar */}
                </div>
                <div className="form-group">
                  <label>Data Início:</label>
                  <input type="date" className="modern-input" value={tratamento.dataInicio} onChange={(e) => handleTratamentoChange(index, 'dataInicio', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Data Fim:</label>
                  <input type="date" className="modern-input" value={tratamento.dataFim} onChange={(e) => handleTratamentoChange(index, 'dataFim', e.target.value)} />
                </div>
                <div className="form-group" style={{gridColumn: '1/-1'}}>
                  <label>Descritivo:</label>
                  <textarea className="modern-input" value={tratamento.descricao} onChange={(e) => handleTratamentoChange(index, 'descricao', e.target.value)} placeholder="Detalhes do tratamento..."></textarea>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="add-item-btn" onClick={addTratamento}>+ Adicionar Tratamento</button>
        </div>

        {/* Exames Realizados (Somente Leitura neste form) */}
        {isEdit && atletaExames.length > 0 && (
          <div style={{marginTop: '40px'}}>
             <h4>Exames Registrados no Sistema</h4>
             <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atletaExames.map(ex => (
                      <tr key={ex._id}>
                        <td>{new Date(ex.dataExame).toLocaleDateString()}</td>
                        <td>{ex.tipoExame}</td>
                        <td>{ex.status}</td>
                        <td>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate(`/exames/${ex._id}`)}>Abrir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default AtletaForm;