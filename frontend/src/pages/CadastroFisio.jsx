import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function CadastroFisio() {
  const [fisios, setFisios] = useState([]);
  const [form, setForm] = useState({ nome: "", registro: "", telefone: "", email: "" });

  async function carregar() {
    const res = await api.get("/fisios");
    setFisios(res.data);
  }

  async function salvar(e) {
    e.preventDefault();
    await api.post("/fisios", form);
    setForm({ nome: "", registro: "", telefone: "", email: "" });
    carregar();
  }

  useEffect(() => { carregar(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cadastro de Fisioterapeuta</h2>
      <form onSubmit={salvar} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border p-2 w-full"
            required
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <h3 className="text-xl mt-6 mb-2">Fisioterapeutas cadastrados</h3>
      <ul className="bg-white shadow rounded p-3">
        {fisios.map((f) => (
          <li key={f._id}>{f.nome} - {f.registro}</li>
        ))}
      </ul>
    </div>
  );
}
