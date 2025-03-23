import { Link } from "react-router-dom";

function ClassificacaoFinanceira() {
  return (
    <div>
      <h2>📁 Classificação Financeira</h2>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem" }}>
        <li>
          <Link to="/classificacao/categorias">➡️ Cadastrar Categoria</Link>
        </li>
        <li style={{ marginTop: '10px' }}>
          <Link to="/classificacao/subcategorias">➡️ Cadastrar Subcategoria</Link>
        </li>
      </ul>
    </div>
  );
}

export default ClassificacaoFinanceira;
