import { useEffect, useState } from "react";

function Categorias() {
  const [nome, setNome] = useState("");
  const [subNome, setSubNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  async function fetchData() {
    const catRes = await fetch("https://node-do-zero-le2o.onrender.com/categorias");
    const subRes = await fetch("https://node-do-zero-le2o.onrender.com/subcategorias");
    const catData = await catRes.json();
    const subData = await subRes.json();

    setCategorias(catData);
    setSubcategorias(subData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleAddCategoria(e) {
    e.preventDefault();
    await fetch("https://seu-backend/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    setNome("");
    fetchData();
  }

  async function handleAddSubcategoria(e) {
    e.preventDefault();
    await fetch("https://node-do-zero-le2o.onrender.com/subcategorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: subNome, categoria_id: categoriaId }),
    });
    setSubNome("");
    setCategoriaId("");
    fetchData();
  }

  const getCategoriaNome = (id) => {
    const cat = categorias.find((c) => c.id === id);
    return cat?.nome || "Desconhecida";
  };

  return (
    <div>
      <h2>Categorias</h2>
      <form onSubmit={handleAddCategoria} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Nova Categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ padding: '6px 12px' }}>Cadastrar</button>
      </form>

      <h2>Subcategorias</h2>
      <form onSubmit={handleAddSubcategoria} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: '6px 12px' }}>Cadastrar</button>
      </form>

      <h3>Subcategorias cadastradas</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#333', color: '#fff' }}>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Categoria</th>
            <th style={{ padding: '10px', border: '1px solid #555' }}>Subcategoria</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map((sub) => (
            <tr key={sub.id} style={{ background: '#222', color: '#fff' }}>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{getCategoriaNome(sub.categoria_id)}</td>
              <td style={{ padding: '10px', border: '1px solid #555' }}>{sub.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categorias;
