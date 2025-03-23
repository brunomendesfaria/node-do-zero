import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Videos from './pages/Videos';
import Parceiros from './pages/Parceiros';
import Lancamentos from './pages/Lancamentos';
import ClassificacaoFinanceira from './pages/ClassificacaoFinanceira';
import CategoriaPage from './pages/CategoriaPage';
import SubcategoriaPage from './pages/SubcategoriaPage';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="menu">
          <h2>📋 Menu</h2>
          <ul>
            <li><Link to="/videos">🎥 Vídeos</Link></li>
            <li><Link to="/classificacao">📂 Classificação Financeira</Link></li>
            <li><Link to="/parceiros">👥 Parceiros</Link></li>
            <li><Link to="/lancamentos">💰 Lançamentos</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/videos" element={<Videos />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/lancamentos" element={<Lancamentos />} />

            {/* Classificação Financeira */}
            <Route path="/classificacao" element={<ClassificacaoFinanceira />} />
            <Route path="/classificacao/categorias" element={<CategoriaPage />} />
            <Route path="/classificacao/subcategorias" element={<SubcategoriaPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
