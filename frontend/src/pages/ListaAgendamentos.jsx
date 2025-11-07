import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  async function carregar() {
    const res = await api.get("/agendamentos");
    setAgendamentos(res.data);
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Consultas Agendadas</h2>
      <div className="bg-white p-4 shadow rounded">
        {agendamentos.map((a) => (
          <div key={a._id} className="border-b py-2">
            <p><strong>Data:</strong> {a.data} - {a.horario}</p>
            <p><strong>Atleta ID:</strong> {a.atletaId}</p>
            <p><strong>Fisioterapeuta ID:</strong> {a.fisioId}</p>
            <p><strong>Obs:</strong> {a.observacao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}