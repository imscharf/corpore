import React from 'react';

const FisioterapeutaDashboard = () => {
  return (
    <div>
      <h1>Bem-vindo ao Dashboard do Fisioterapeuta</h1>
      <p>Aqui você pode gerenciar atletas, diagnósticos, anamneses, agendamentos e exames.</p>

      {/* Exemplo de card ou atalho rápido */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '200px' }}>
          <h3>Cadastrar Atleta</h3>
          <p>Adicione novos atletas ao sistema.</p>
          <a href="/cadastro/atleta">Ir para Cadastro</a>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '200px' }}>
          <h3>Ver Agendamentos</h3>
          <p>Visualize e gerencie consultas agendadas.</p>
          <a href="/agendamentos">Ir para Agendamentos</a>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '200px' }}>
          <h3>Ver Exames</h3>
          <p>Acompanhe o status e laudos de exames.</p>
          <a href="/exames">Ir para Exames</a>
        </div>
      </div>
    </div>
  );
};

export default FisioterapeutaDashboard;