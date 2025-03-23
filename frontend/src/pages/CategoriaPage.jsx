import { useEffect, useState } from "react";

function CategoriaPage() {
  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "https://node-do-zero-le2o.onrender.com";

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function fetchCategorias() {
    const res = await fetch(`${API}/categorias`);
    const data = await res.json();
    setCategorias(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/categorias/${editId}` : `${API}/categorias`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });

    setNome("");
    setEditId(null);
    fetchCategorias();
  }

  async function handleDelete(id) {
    await fetch(`${API}/categorias/${id}`, { method: "DELETE" });
    fetchCategorias();
  }

  return (
    <div>
      <h2>📁 Cadastro de Categorias</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Nova Categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && (
          <button type="button" onClick={() => {
            setNome("");
            setEditId(null);
          }}>Cancelar</button>
        )}
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#333", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Categoria</th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id} style={{ background: "#222", color: "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #555" }}>{cat.nome}</td>
              <td style={{ padding: "10px", border: "1px solid #555" }}>
                <button onClick={() => {
                  setEditId(cat.id);
                  setNome(cat.nome);
                }}>Editar</button>
                <button onClick={() => handleDelete(cat.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaPage;
