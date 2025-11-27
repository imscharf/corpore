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
    inicioCarreira: '', historicoLesoes: '', tratamentosRealizados: ''
  });

  const [atletaExames, setAtletaExames] = useState([]);

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const atleta = await atletaService.getAtletaById(id);
          // Formatação segura de datas para o input HTML
          if(atleta.dataNascimento) atleta.dataNascimento = new Date(atleta.dataNascimento).toISOString().split('T')[0];
          if(atleta.inicioCarreira) atleta.inicioCarreira = new Date(atleta.inicioCarreira).toISOString().split('T')[0];
          
          // Garante que campos numéricos não sejam null/undefined no state (para evitar warnings do React)
          setFormData({
            ...atleta,
            peso: atleta.peso || '',
            altura: atleta.altura || '',
            horasTreinamento: atleta.horasTreinamento || ''
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- CORREÇÃO DO ERRO 400 ---
      // Sanitização: Remove campos numéricos ou datas opcionais se estiverem vazios
      const dataToSend = { ...formData };
      
      const numericFields = ['peso', 'altura', 'horasTreinamento'];
      numericFields.forEach(field => {
        if (dataToSend[field] === '') delete dataToSend[field];
      });

      if (dataToSend.inicioCarreira === '') delete dataToSend.inicioCarreira;
      // -----------------------------

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
      // Mensagem de erro mais amigável
      const msg = error.response?.data?.message || 'Erro ao salvar. Verifique se o CPF ou Email já estão cadastrados.';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? `Editar Atleta: ${formData.nome}` : 'Novo Atleta'}</h2>
      
      {/* Botões alinhados à esquerda */}
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
            <input className="modern-input" name="cpf" value={formData.cpf} onChange={handleChange} required />
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
        <h3>Histórico Esportivo & Médico</h3>
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
           <div className="form-group" style={{gridColumn: '1/-1'}}>
             <label>Histórico de Lesões:</label>
             <textarea className="modern-input" name="historicoLesoes" value={formData.historicoLesoes} onChange={handleChange} rows="3"></textarea>
           </div>
           <div className="form-group" style={{gridColumn: '1/-1'}}>
             <label>Tratamentos Realizados:</label>
             <textarea className="modern-input" name="tratamentosRealizados" value={formData.tratamentosRealizados} onChange={handleChange} rows="3"></textarea>
           </div>
        </div>

        <h4>Exames Realizados</h4>
        {isEdit && atletaExames.length > 0 ? (
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
        ) : (
          <p>{isEdit ? "Nenhum exame encontrado." : "Salve o atleta antes de visualizar exames."}</p>
        )}
      </div>
    </form>
  );
};

export default AtletaForm;