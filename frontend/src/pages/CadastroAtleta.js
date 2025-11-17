import React, { useState } from 'react';
import atletaService from '../services/atletaService';

const CadastroAtleta = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sexo: 'Masculino',
    dataNascimento: '',
    equipe: '',
    uf: '',
    rg: '',
    cpf: '',
    peso: '',
    altura: '',
    email: '',
    telefone: '',
    horasTreinamento: '',
    inicioCarreira: '',
    historicoLesoes: '',
    tratamentosRealizados: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajustar dataNascimento e inicioCarreira para o formato Date esperado pelo backend
      const dataToSend = {
        ...formData,
        dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento) : undefined,
        inicioCarreira: formData.inicioCarreira ? new Date(formData.inicioCarreira) : undefined,
      };
      await atletaService.createAtleta(dataToSend);
      alert('Atleta cadastrado com sucesso!');
      // Resetar formulário ou redirecionar
      setFormData({
        nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
        peso: '', altura: '', email: '', telefone: '', horasTreinamento: '',
        inicioCarreira: '', historicoLesoes: '', tratamentosRealizados: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar atleta:', error);
      alert('Erro ao cadastrar atleta. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Atleta</h2>
      <form onSubmit={handleSubmit}>
        {/* Renderize os campos do formulário conforme o PDF */}
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sexo:</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        {/* Continue com os outros campos... */}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CadastroAtleta;