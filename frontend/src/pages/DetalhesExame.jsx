import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export default function DetalhesExame() {
  const { id } = useParams();
  const [exame, setExame] = useState(null);
  const [atleta, setAtleta] = useState(null);

  async function carregar() {
    const res = await api.get(`/diagnosticos`);
    const diag = res.data.find((d) => d._id === id);
    setExame(diag);
    if (diag?.atletaId) {
      const atletaRes = await api.get(`/atletas`);
      const at = atletaRes.data.find((a) => a._id === diag.atletaId);
      setAtleta(at);
    }
  }

  useEffect(() => { carregar(); }, [id]);

  if (!exame) return <p>Carregando...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Detalhes do Exame</h2>
      {atleta && (
        <div className="bg-white shadow p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Dados do Atleta</h3>
          <p>Nome: {atleta.nome}</p>
          <p>CPF: {atleta.cpf}</p>
          <p>Telefone: {atleta.telefone}</p>
        </div>
      )}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold mb-2">Diagnóstico</h3>
        <p>{exame.descricao}</p>
        {exame.laudoDigitalizado && (
          <div className="mt-4">
            <p className="font-bold">Laudo Digitalizado:</p>
            <img src={exame.laudoDigitalizado} alt="Laudo" className="max-w-sm mt-2 border" />
          </div>
        )}
      </div>
    </div>
  );
}