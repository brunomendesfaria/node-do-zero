import { useEffect, useState } from "react";

function Categorias() {
  const [nome, setNome] = useState("");
  const [subNome, setSubNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  async function fetchCategorias() {
    const res = await fetch('https://node-do-zero-le2o.onrender.com/categorias');
    const data = await res.json();
    setCategorias(data);
  }

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function handleAddCategoria(e) {
    e.preventDefault();
    await fetch('https://node-do-zero-le2o.onrender.com/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    setNome('');
    fetchCategorias();
  }

  async function handleAddSubcategoria(e) {
    e.preventDefault();
    await fetch('https://node-do-zero-le2o.onrender.com/subcategorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: subNome, categoria_id: categoriaId })
    });
    setSubNome('');
    fetchCategorias();
  }

  return (
    <div>
      <h2>Categorias</h2>
      <form onSubmit={handleAddCategoria}>
        <input
          placeholder="Nova Categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Cadastrar Categoria</button>
      </form>

      <h2>Subcategorias</h2>
      <form onSubmit={handleAddSubcategoria}>
        <input
          placeholder="Nova Subcategoria"
          value={subNome}
          onChange={(e) => setSubNome(e.target.value)}
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
        <button type="submit">Cadastrar Subcategoria</button>
      </form>
    </div>
  );
}

export default Categorias;
