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
    email: '', // Adicione o campo email aqui
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
        peso: '', altura: '', email: '', telefone: '', horasTreinamento: '', // Certifique-se de resetar o email também
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
        {/* NOVO CAMPO: Email */}
        <div className="form-group">
          <label>E-mail:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        {/* Outros campos opcionais que você queira adicionar, baseados no modelo Atleta.js */}
        <div className="form-group">
          <label>Equipe:</label>
          <input type="text" name="equipe" value={formData.equipe} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>UF:</label>
          <input type="text" name="uf" value={formData.uf} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>RG:</label>
          <input type="text" name="rg" value={formData.rg} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Peso:</label>
          <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Altura:</label>
          <input type="number" name="altura" value={formData.altura} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Horas de Treinamento:</label>
          <input type="number" name="horasTreinamento" value={formData.horasTreinamento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Início da Carreira:</label>
          <input type="date" name="inicioCarreira" value={formData.inicioCarreira} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Histórico de Lesões:</label>
          <textarea name="historicoLesoes" value={formData.historicoLesoes} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Tratamentos Realizados:</label>
          <textarea name="tratamentosRealizados" value={formData.tratamentosRealizados} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setFormData({
            nome: '', sexo: 'Masculino', dataNascimento: '', equipe: '', uf: '', rg: '', cpf: '',
            peso: '', altura: '', email: '', telefone: '', horasTreinamento: '',
            inicioCarreira: '', historicoLesoes: '', tratamentosRealizados: '',
          })}>Cancelar</button>
      </form>
    </div>
  );
};

export default CadastroAtleta;