import { useEffect, useState } from "react";

function Lancamentos() {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [valor, setValor] = useState(0);
  const [parceiroId, setParceiroId] = useState("");
  const [subcategoriaId, setSubcategoriaId] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [vencimentos, setVencimentos] = useState([""]);
  const [valores, setValores] = useState([""]);

  const [parceiros, setParceiros] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    fetch("https://seu-backend/parceiros").then(res => res.json()).then(setParceiros);
    fetch("https://seu-backend/subcategorias").then(res => res.json()).then(setSubcategorias);
  }, []);

  useEffect(() => {
    // Preenche vencimentos e valores quando muda o número de parcelas
    setVencimentos(Array(Number(parcelas)).fill(""));
    setValores(Array(Number(parcelas)).fill(valor / parcelas));
  }, [parcelas, valor]);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("https://seu-backend/lancamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        descricao,
        valor,
        parceiro_id: parceiroId,
        subcategoria_id: subcategoriaId,
        quantidade_parcelas: parcelas,
        vencimentos,
        valores,
      }),
    });

    alert("Lançamento realizado!");
    setDescricao("");
    setValor(0);
    setParcelas(1);
    setVencimentos([""]);
    setValores([""]);
  }

  return (
    <div>
      <h2>Lançamento Financeiro</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor total"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <select value={parceiroId} onChange={(e) => setParceiroId(e.target.value)}>
          <option value="">Selecione um parceiro</option>
          {parceiros.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <select value={subcategoriaId} onChange={(e) => setSubcategoriaId(e.target.value)}>
          <option value="">Selecione uma subcategoria</option>
          {subcategorias.map(sc => (
            <option key={sc.id} value={sc.id}>{sc.nome}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qtd. Parcelas"
          value={parcelas}
          onChange={(e) => setParcelas(Number(e.target.value))}
        />

        {vencimentos.map((v, i) => (
          <div key={i}>
            <label>Parcela {i + 1}</label>
            <input
              type="date"
              value={v}
              onChange={(e) => {
                const novos = [...vencimentos];
                novos[i] = e.target.value;
                setVencimentos(novos);
              }}
            />
            <input
              type="number"
              value={valores[i]}
              onChange={(e) => {
                const novos = [...valores];
                novos[i] = Number(e.target.value);
                setValores(novos);
              }}
            />
          </div>
        ))}

        <button type="submit">Lançar</button>
      </form>
    </div>
  );
}

export default Lancamentos;
