import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import atletaService from '../services/atletaService';

const AtletaList = () => {
  const [atletas, setAtletas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAtletas = async () => {
      try {
        const data = await atletaService.getAtletas();
        setAtletas(data);
      } catch (error) {
        console.error("Erro ao buscar atletas", error);
      }
    };
    fetchAtletas();
  }, []);

  return (
    <div>
      <h2>Atletas Cadastrados</h2>
      
      {/* Botão alinhado à esquerda e verde */}
      <div className="action-buttons">
        <button className="btn btn-success" onClick={() => navigate('/cadastro/atleta/novo')}>
          + Novo Atleta
        </button>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Idade</th>
              <th>UF</th>
              <th>Equipe</th>
              <th style={{textAlign: 'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {atletas.map((atleta) => {
              const idade = atleta.dataNascimento 
                ? new Date().getFullYear() - new Date(atleta.dataNascimento).getFullYear() 
                : 'N/A';
                
              return (
                <tr key={atleta._id}>
                  <td>{atleta.nome}</td>
                  <td>{atleta.cpf}</td>
                  <td>{idade} anos</td>
                  <td>{atleta.uf}</td>
                  <td>{atleta.equipe}</td>
                  <td style={{textAlign: 'center'}}>
                    {/* Botão "Abrir" explícito */}
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/cadastro/atleta/${atleta._id}`)}
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              );
            })}
            {atletas.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                  Nenhum atleta cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AtletaList;