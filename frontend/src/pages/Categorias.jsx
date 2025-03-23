import { useEffect, useState } from "react";

function Categorias() {
  const [nome, setNome] = useState("");
  const [subNome, setSubNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editSubId, setEditSubId] = useState(null);

  const API = "https://node-do-zero-le2o.onrender.com";

  async function fetchData() {
    const catRes = await fetch(`${API}/categorias`);
    const subRes = await fetch(`${API}/subcategorias`);
    const catData = await catRes.json();
    const subData = await subRes.json();
    setCategorias(catData);
    setSubcategorias(subData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCategoriaSubmit(e) {
    e.preventDefault();
    if (editCategoriaId) {
      await fetch(`${API}/categorias/${editCategoriaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
    } else {
      await fetch(`${API}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
    }
    resetCategoriaForm();
    fetchData();
  }

  async function handleSubcategoriaSubmit(e) {
    e.preventDefault();
    if (editSubId) {
      await fetch(`${API}/subcategorias/${editSubId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: subNome, categoria_id: categoriaId }),
      });
    } else {
      await fetch(`${API}/subcategorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: subNome, categoria_id: categoriaId }),
      });
    }
    resetSubForm();
    fetchData();
  }

  async function handleDeleteCategoria(id) {
    await fetch(`${API}/categorias/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleDeleteSubcategoria(id) {
    await fetch(`${API}/subcategorias/${id}`, { method: "DELETE" });
    fetchData();
  }

  function resetCategoriaForm() {
    setNome("");
    setEditCategoriaId(null);
  }

  function resetSubForm() {
    setSubNome("");
    setCategoriaId("");
    setEditSubId(null);
  }

  function getCategoriaNome(id) {
    const cat = categorias.find((c) => c.id === id);
    return cat?.nome || "Desconhecida";
  }

  return (
    <div>
      <h2>Categorias</h2>
      <form onSubmit={handleCategoriaSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Nova Categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">{editCategoriaId ? "Atualizar" : "Cadastrar"}</button>
        {editCategoriaId && (
          <button type="button" onClick={resetCategoriaForm}>Cancelar</button>
        )}
      </form>

      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>
            {cat.nome}
            <button onClick={() => {
              setNome(cat.nome);
              setEditCategoriaId(cat.id);
            }}>Editar</button>
            <button onClick={() => handleDeleteCategoria(cat.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Subcategorias</h2>
      <form onSubmit={handleSubcategoriaSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Nova Subcategoria"
          value={subNome}
          onChange={(e) => setSubNome(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <button type="submit">{editSubId ? "Atualizar" : "Cadastrar"}</button>
        {editSubId && (
          <button type="button" onClick={resetSubForm}>Cancelar</button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#333', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Categoria</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Subcategoria</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map((sub) => (
            <tr key={sub.id} style={{ background: '#222', color: '#fff' }}>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{getCategoriaNome(sub.categoria_id)}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{sub.nome}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>
                <button onClick={() => {
                  setEditSubId(sub.id);
                  setSubNome(sub.nome);
                  setCategoriaId(sub.categoria_id);
                }}>Editar</button>
                <button onClick={() => handleDeleteSubcategoria(sub.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categorias;
