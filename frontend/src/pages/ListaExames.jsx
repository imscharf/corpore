import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function ListaExames() {
  const [diagnosticos, setDiagnosticos] = useState([]);

  async function carregar() {
    const res = await api.get("/diagnosticos");
    setDiagnosticos(res.data);
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exames (Laudos)</h2>
      <ul className="bg-white shadow rounded p-3 space-y-2">
        {diagnosticos.map((d) => (
          <li key={d._id} className="p-2 border rounded hover:bg-gray-100">
            <Link to={`/exames/${d._id}`}>
              <p><strong>Diagnóstico:</strong> {d.descricao}</p>
              <p><small>{new Date(d.data).toLocaleDateString()}</small></p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}