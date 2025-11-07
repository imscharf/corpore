import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function CadastroDiagnostico() {
  const [atletas, setAtletas] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [form, setForm] = useState({ atletaId: "", descricao: "", laudoDigitalizado: "" });

  async function carregar() {
    const resA = await api.get("/atletas");
    setAtletas(resA.data);
    const resD = await api.get("/diagnosticos");
    setDiagnosticos(resD.data);
  }

  async function salvar(e) {
    e.preventDefault();
    await api.post("/diagnosticos", form);
    setForm({ atletaId: "", descricao: "", laudoDigitalizado: "" });
    carregar();
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cadastro de Diagnóstico</h2>
      <form onSubmit={salvar} className="space-y-3">
        <select
          value={form.atletaId}
          onChange={(e) => setForm({ ...form, atletaId: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Selecione o atleta</option>
          {atletas.map((a) => (
            <option key={a._id} value={a._id}>{a.nome}</option>
          ))}
        </select>

        <textarea
          placeholder="Descrição do diagnóstico"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          placeholder="Link do laudo digitalizado (URL ou base64)"
          value={form.laudoDigitalizado}
          onChange={(e) => setForm({ ...form, laudoDigitalizado: e.target.value })}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <h3 className="text-xl mt-6 mb-2">Diagnósticos Cadastrados</h3>
      <ul className="bg-white shadow rounded p-3">
        {diagnosticos.map((d) => (
          <li key={d._id}>
            {d.descricao} ({new Date(d.data).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}