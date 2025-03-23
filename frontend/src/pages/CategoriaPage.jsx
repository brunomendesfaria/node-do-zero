import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSyncAlt, FaTimes } from "react-icons/fa";
import IconButton from "../components/IconButton";


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

    resetForm();
    fetchCategorias();
  }

  async function handleDelete(id) {
    const res = await fetch(`${API}/categorias/${id}`, { method: "DELETE" });
  
    if (res.status === 400) {
      const err = await res.json();
      alert(err.error); // ou usar um toast
    } else {
      fetchCategorias();
    }
  }
  function resetForm() {
    setNome("");
    setEditId(null);
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

        <IconButton
          icon={FaSyncAlt}
          type="submit"
          title={editId ? "Atualizar" : "Cadastrar"}
          color="success"
        />

        {editId && (
          <IconButton
            icon={FaTimes}
            type="button"
            onClick={resetForm}
            title="Cancelar"
            color="danger"
          />
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
                <IconButton
                  icon={FaEdit}
                  onClick={() => {
                    setEditId(cat.id);
                    setNome(cat.nome);
                  }}
                  title="Editar"
                  color="warning"
                />
                <IconButton
                  icon={FaTrash}
                  onClick={() => handleDelete(cat.id)}
                  title="Excluir"
                  color="danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaPage;
