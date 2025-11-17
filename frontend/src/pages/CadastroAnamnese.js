import React, { useState, useEffect } from 'react';
import anamneseService from '../services/anamneseService';
import atletaService from '../services/atletaService';
import fisioterapeutaService from '../services/fisioterapeutaService';

const CadastroAnamnese = () => {
  const [formData, setFormData] = useState({
    atleta: '',
    fisioterapeuta: '',
    dataConsulta: '',
    descricao: '',
  });
  const [atletas, setAtletas] = useState([]);
  const [fisioterapeutas, setFisioterapeutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const atletasData = await atletaService.getAtletas();
        const fisiosData = await fisioterapeutaService.getFisioterapeutas();
        setAtletas(atletasData);
        setFisioterapeutas(fisiosData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados para o formulário.');
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        dataConsulta: formData.dataConsulta ? new Date(formData.dataConsulta) : undefined,
      };
      await anamneseService.createAnamnese(dataToSend);
      alert('Anamnese cadastrada com sucesso!');
      setFormData({ atleta: '', fisioterapeuta: '', dataConsulta: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao cadastrar anamnese:', error);
      alert('Erro ao cadastrar anamnese. Verifique o console.');
    }
  };

  if (loading) return <div>Carregando formulário de anamnese...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Cadastrar Anamnese</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Atleta:</label>
          <select name="atleta" value={formData.atleta} onChange={handleChange} required>
            <option value="">Selecione um Atleta</option>
            {atletas.map((atleta) => (
              <option key={atleta._id} value={atleta._id}>
                {atleta.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fisioterapeuta:</label>
          <select name="fisioterapeuta" value={formData.fisioterapeuta} onChange={handleChange} required>
            <option value="">Selecione um Fisioterapeuta</option>
            {fisioterapeutas.map((fisioterapeuta) => (
              <option key={fisioterapeuta._id} value={fisioterapeuta._id}>
                {fisioterapeuta.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data da Consulta:</label>
          <input type="date" name="dataConsulta" value={formData.dataConsulta} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="6" required></textarea>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setFormData({ atleta: '', fisioterapeuta: '', dataConsulta: '', descricao: '' })}>Cancelar</button>
      </form>
    </div>
  );
};

export default CadastroAnamnese;