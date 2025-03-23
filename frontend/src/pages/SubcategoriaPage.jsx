import { FaEdit, FaTrash } from "react-icons/fa"; // lá no topo do arquivo
import { useEffect, useState } from "react";

function SubcategoriaPage() {
  const [subNome, setSubNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "https://node-do-zero-le2o.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const resSub = await fetch(`${API}/subcategorias`);
    const resCat = await fetch(`${API}/categorias`);
    const dataSub = await resSub.json();
    const dataCat = await resCat.json();
    setSubcategorias(dataSub);
    setCategorias(dataCat);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API}/subcategorias/${editId}`
      : `${API}/subcategorias`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: subNome,
        categoria_id: categoriaId,
      }),
    });

    resetForm();
    fetchData();
  }

  async function handleDelete(id) {
    await fetch(`${API}/subcategorias/${id}`, { method: "DELETE" });
    fetchData();
  }

  function resetForm() {
    setSubNome("");
    setCategoriaId("");
    setEditId(null);
  }

  function getCategoriaNome(id) {
    const cat = categorias.find((c) => c.id === id);
    return cat?.nome || "—";
  }

  return (
    <div>
      <h2>📁 Cadastro de Subcategorias</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          placeholder="Nova Subcategoria"
          value={subNome}
          onChange={(e) => setSubNome(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>

        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#333", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #555" }}>
              Categoria
            </th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>
              Subcategoria
            </th>
            <th style={{ padding: "10px", border: "1px solid #555" }}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map((sub) => (
            <tr key={sub.id} style={{ background: "#222", color: "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #555" }}>
                {getCategoriaNome(sub.categoria_id)}
              </td>
              <td style={{ padding: "10px", border: "1px solid #555" }}>
                {sub.nome}
              </td>
              <td style={{ padding: "5px", border: "1px solid #555" }}>
                <button
                  onClick={() => {
                    setEditId(sub.id);
                    setSubNome(sub.nome);
                    setCategoriaId(sub.categoria_id);
                  }}
                  title="Editar"
                  style={{ background: "transparent", border: "none", cursor: "pointer", marginRight: "10px" }}
                >
                  <FaEdit color="#ffc107" size={18} />
                </button>

                <button
                  onClick={() => handleDelete(sub.id)}
                  title="Excluir"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <FaTrash color="#dc3545" size={18} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubcategoriaPage;
