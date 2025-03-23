import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import { FaEdit, FaTrash, FaSyncAlt, FaTimes } from "react-icons/fa";

function Parceiros() {
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    classificacao: ""
  });

  const [parceiros, setParceiros] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "https://node-do-zero-le2o.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (form.cep.length === 9) {
      const cep = form.cep.replace("-", "");
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setForm((prev) => ({
              ...prev,
              logradouro: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              uf: data.uf || "",
              complemento: data.complemento || ""
            }));
          }
        });
    }
  }, [form.cep]);

  async function fetchData() {
    const res = await fetch(`${API}/parceiros`);
    const data = await res.json();
    setParceiros(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API}/parceiros/${editId}`
      : `${API}/parceiros`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      nome: "",
      documento: "",
      email: "",
      telefone: "",
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      classificacao: ""
    });
    setEditId(null);
    fetchData();
  }

  async function handleDelete(id) {
    await fetch(`${API}/parceiros/${id}`, { method: "DELETE" });
    fetchData();
  }

  function handleEdit(parceiro) {
    setForm(parceiro);
    setEditId(parceiro.id);
  }

  function handleCancel() {
    setForm({
      nome: "",
      documento: "",
      email: "",
      telefone: "",
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      classificacao: ""
    });
    setEditId(null);
  }

  return (
    <div>
      <h2>👥 Cadastro de Parceiros</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginBottom: "20px" }}>
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input placeholder="Documento" value={form.documento} onChange={(e) => setForm({ ...form, documento: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Telefone" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
        <input placeholder="CEP" value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} />
        <input placeholder="Logradouro" value={form.logradouro} onChange={(e) => setForm({ ...form, logradouro: e.target.value })} />
        <input placeholder="Complemento" value={form.complemento} onChange={(e) => setForm({ ...form, complemento: e.target.value })} />
        <input placeholder="Bairro" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} />
        <input placeholder="Cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
        <input placeholder="UF" value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })} maxLength={2} />

        <select value={form.classificacao} onChange={(e) => setForm({ ...form, classificacao: e.target.value })}>
          <option value="">Classificação</option>
          <option value="cliente">Cliente</option>
          <option value="fornecedor">Fornecedor</option>
          <option value="transportadora">Transportadora</option>
        </select>


        <IconButton
          icon={FaSyncAlt}
          type="submit"
          title={editId ? "Atualizar" : "Cadastrar"}
          color="success"
        />

        {editId && (
          <IconButton
            icon={FaTimes}
            onClick={handleCancel}
            title="Cancelar"
            color="danger"
          />
        )}
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#333", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Nome</th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Documento</th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Cidade</th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Classificação</th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {parceiros.map((p) => (
            <tr key={p.id} style={{ background: "#222", color: "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #555" }}>{p.nome}</td>
              <td style={{ padding: "10px", border: "1px solid #555" }}>{p.documento}</td>
              <td style={{ padding: "10px", border: "1px solid #555" }}>{p.cidade}</td>
              <td style={{ padding: "10px", border: "1px solid #555" }}>{p.classificacao}</td>
              <td style={{ padding: "5px", border: "1px solid #555" }}>
                <IconButton icon={FaEdit} title="Editar" onClick={() => handleEdit(p)} color="warning" />
                <IconButton icon={FaTrash} title="Excluir" onClick={() => handleDelete(p.id)} color="danger" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parceiros;
