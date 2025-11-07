import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function NovoAgendamento() {
  const [atletas, setAtletas] = useState([]);
  const [fisios, setFisios] = useState([]);
  const [form, setForm] = useState({ atletaId: "", fisioId: "", data: "", horario: "", observacao: "" });

  async function carregar() {
    const resA = await api.get("/atletas");
    setAtletas(resA.data);
    const resF = await api.get("/fisios");
    setFisios(resF.data);
  }

  async function salvar(e) {
    e.preventDefault();
    await api.post("/agendamentos", form);
    setForm({ atletaId: "", fisioId: "", data: "", horario: "", observacao: "" });
    alert("Agendamento criado!");
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Novo Agendamento</h2>
      <form onSubmit={salvar} className="space-y-3">
        <select
          value={form.atletaId}
          onChange={(e) => setForm({ ...form, atletaId: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Selecione o atleta</option>
          {atletas.map((a) => <option key={a._id} value={a._id}>{a.nome}</option>)}
        </select>

        <select
          value={form.fisioId}
          onChange={(e) => setForm({ ...form, fisioId: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Selecione o fisioterapeuta</option>
          {fisios.map((f) => <option key={f._id} value={f._id}>{f.nome}</option>)}
        </select>

        <input
          type="date"
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          type="time"
          value={form.horario}
          onChange={(e) => setForm({ ...form, horario: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Observações"
          value={form.observacao}
          onChange={(e) => setForm({ ...form, observacao: e.target.value })}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}