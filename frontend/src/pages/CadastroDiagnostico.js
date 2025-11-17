import React, { useState } from 'react';
import diagnosticoService from '../services/diagnosticoService';

const CadastroDiagnostico = () => {
  const [formData, setFormData] = useState({
    diagnostico: '',
    descricao: '',
    planoTratamento: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await diagnosticoService.createDiagnostico(formData);
      alert('Diagnóstico pré-cadastrado com sucesso!');
      setFormData({ diagnostico: '', descricao: '', planoTratamento: '' });
    } catch (error) {
      console.error('Erro ao cadastrar diagnóstico:', error);
      alert('Erro ao cadastrar diagnóstico. Verifique o console.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Diagnóstico:</label>
          <input type="text" name="diagnostico" value={formData.diagnostico} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descrição do Diagnóstico:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="4" required></textarea>
        </div>
        <div className="form-group">
          <label>Plano de tratamento:</label>
          <textarea name="planoTratamento" value={formData.planoTratamento} onChange={handleChange} rows="4" required></textarea>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setFormData({ diagnostico: '', descricao: '', planoTratamento: '' })}>Cancelar</button>
      </form>
    </div>
  );
};

export default CadastroDiagnostico;