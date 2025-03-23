import { useEffect, useState } from "react";

function Parceiros() {
  const [nome, setNome] = useState("");
  const [classificacao, setClassificacao] = useState("cliente");
  const [parceiros, setParceiros] = useState([]);

  async function fetchParceiros() {
    const res = await fetch("https://seu-backend/parceiros");
    const data = await res.json();
    setParceiros(data);
  }

  useEffect(() => {
    fetchParceiros();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("https://seu-backend/parceiros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, classificacao }),
    });

    setNome("");
    setClassificacao("cliente");
    fetchParceiros();
  }

  return (
    <div>
      <h2>Cadastro de Parceiros</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome do parceiro"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select
          value={classificacao}
          onChange={(e) => setClassificacao(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="fornecedor">Fornecedor</option>
          <option value="transportadora">Transportadora</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Parceiros cadastrados:</h3>
      <ul>
        {parceiros.map((p) => (
          <li key={p.id}>
            <strong>{p.nome}</strong> - {p.classificacao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Parceiros;
