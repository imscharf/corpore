import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import exameService from '../services/exameService';
import atletaService from '../services/atletaService';
import fisioterapeutaService from '../services/fisioterapeutaService';

const ViewExame = ({ mode = 'view' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreateMode = mode === 'create';
  
  // Estado das Abas: 'dados' ou 'diagnostico'
  const [activeTab, setActiveTab] = useState('dados');

  // Estado do Formulário
  const [formData, setFormData] = useState({
    atleta: '',
    fisioterapeuta: '',
    tipoExame: '',
    dataExame: new Date().toISOString().split('T')[0],
    status: 'Em Andamento',
    resultado: '', // Campo livre para diagnóstico
    laudoLiberado: false
  });

  // Listas para os selects
  const [atletas, setAtletas] = useState([]);
  const [fisioterapeutas, setFisioterapeutas] = useState([]);

  // Carregar dados iniciais
  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [atletasData, fisiosData] = await Promise.all([
          atletaService.getAtletas(),
          fisioterapeutaService.getFisioterapeutas()
        ]);
        setAtletas(atletasData);
        setFisioterapeutas(fisiosData);
      } catch (err) {
        console.error("Erro ao carregar listas", err);
      }
    };
    loadDependencies();

    if (!isCreateMode && id) {
      const loadExame = async () => {
        try {
          const exame = await exameService.getExameById(id);
          // Tratamento para garantir que pegamos o ID se o objeto vier populado
          const atletaId = exame.atleta && exame.atleta._id ? exame.atleta._id : exame.atleta;
          const fisioId = exame.fisioterapeuta && exame.fisioterapeuta._id ? exame.fisioterapeuta._id : exame.fisioterapeuta;
          
          setFormData({
            ...exame,
            atleta: atletaId || '',
            fisioterapeuta: fisioId || '',
            dataExame: new Date(exame.dataExame).toISOString().split('T')[0]
          });
        } catch (err) {
          console.error("Erro ao carregar exame", err);
        }
      };
      loadExame();
    }
  }, [id, isCreateMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isCreateMode) {
        const newExame = await exameService.createExame(formData);
        alert('Exame cadastrado com sucesso!');
        navigate(`/exames/${newExame._id}`);
      } else {
        await exameService.updateExame(id, formData);
        alert('Exame atualizado com sucesso!');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar exame.');
    }
  };

  // Função de Geração de PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Buscar nomes completos baseados nos IDs selecionados
    const atletaObj = atletas.find(a => a._id === formData.atleta);
    const atletaNome = atletaObj?.nome || 'Não informado';
    
    const fisioObj = fisioterapeutas.find(f => f._id === formData.fisioterapeuta);
    const fisioNome = fisioObj?.nome || 'Não informado';
    const fisioCrefito = fisioObj?.crefito || '';

    // --- Cabeçalho do PDF ---
    doc.setFontSize(22);
    doc.setTextColor(0, 86, 179); // Azul
    doc.text("CORPORE - Relatório Clínico", 105, 20, null, null, "center");
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // --- Informações Gerais ---
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Data
    doc.setFont("helvetica", "bold");
    doc.text(`Data do Exame:`, 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(formData.dataExame).toLocaleDateString('pt-BR'), 60, 40);

    // Paciente
    doc.setFont("helvetica", "bold");
    doc.text(`Paciente (Atleta):`, 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(atletaNome, 60, 50);

    // Fisioterapeuta
    doc.setFont("helvetica", "bold");
    doc.text(`Fisioterapeuta:`, 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${fisioNome} (CREFITO: ${fisioCrefito})`, 60, 60);

    // Tipo
    doc.setFont("helvetica", "bold");
    doc.text(`Tipo de Exame:`, 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(formData.tipoExame, 60, 70);

    // Linha divisória
    doc.line(20, 80, 190, 80);

    // --- Diagnóstico ---
    doc.setFontSize(16);
    doc.setTextColor(0, 86, 179);
    doc.text("Diagnóstico / Laudo", 20, 95);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    
    // Quebra de texto automática
    const textLines = doc.splitTextToSize(formData.resultado || "Sem diagnóstico informado.", 170);
    doc.text(textLines, 20, 105);

    // Salvar arquivo
    doc.save(`Laudo_${atletaNome.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <form onSubmit={handleSave}>
      <h2>{isCreateMode ? 'Novo Exame' : 'Detalhes do Exame'}</h2>

      {/* --- BOTÕES DE AÇÃO (Topo Esquerdo) --- */}
      <div className="action-buttons">
         <button type="submit" className="btn btn-success">
            Salvar
         </button>
         <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/exames')}
         >
            {isCreateMode ? 'Cancelar' : 'Voltar'}
         </button>
      </div>

      {/* --- NAVEGAÇÃO DE ABAS --- */}
      <div className="tabs-header">
        <button 
          type="button"
          className={`tab-item ${activeTab === 'dados' ? 'active' : ''}`}
          onClick={() => setActiveTab('dados')}
        >
          Dados do Atleta
        </button>
        <button 
          type="button"
          className={`tab-item ${activeTab === 'diagnostico' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnostico')}
        >
          Diagnóstico
        </button>
      </div>

      {/* --- CONTEÚDO DA ABA: DADOS DO ATLETA --- */}
      {activeTab === 'dados' && (
        <div className="card" style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div className="form-group">
              <label>Atleta:</label>
              <select 
                className="modern-input" 
                name="atleta" 
                value={formData.atleta} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecione o Atleta...</option>
                {atletas.map(a => (
                  <option key={a._id} value={a._id}>{a.nome} - {a.cpf}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Fisioterapeuta Responsável:</label>
              <select 
                className="modern-input" 
                name="fisioterapeuta" 
                value={formData.fisioterapeuta} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecione o Fisioterapeuta...</option>
                {fisioterapeutas.map(f => (
                  <option key={f._id} value={f._id}>{f.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de Exame:</label>
              <input 
                className="modern-input" 
                name="tipoExame" 
                value={formData.tipoExame} 
                onChange={handleChange} 
                placeholder="Ex: Ressonância Magnética"
                required 
              />
            </div>

            <div className="form-group">
              <label>Data do Exame:</label>
              <input 
                className="modern-input" 
                type="date" 
                name="dataExame" 
                value={formData.dataExame} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select 
                className="modern-input" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Liberado">Liberado</option>
              </select>
            </div>

          </div>
        </div>
      )}

      {/* --- CONTEÚDO DA ABA: DIAGNÓSTICO --- */}
      {activeTab === 'diagnostico' && (
        <div className="card" style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}}>
          
          <div className="tab-content-header">
            <h3>Laudo Médico</h3>
            {/* Botão de PDF no canto superior direito da aba */}
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={generatePDF}
              title="Gerar PDF com os dados atuais"
            >
              Visualizar Laudo (PDF)
            </button>
          </div>
          
          <div className="form-group">
            <label>Descrição Detalhada / Parecer:</label>
            <textarea 
              className="modern-input" 
              name="resultado" 
              value={formData.resultado} 
              onChange={handleChange} 
              placeholder="Digite aqui o diagnóstico, observações clínicas e conclusões do exame..."
              style={{ minHeight: '300px' }}
            ></textarea>
          </div>
        </div>
      )}
    </form>
  );
};

export default ViewExame;