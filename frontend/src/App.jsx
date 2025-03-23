import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Videos from './pages/Videos';
import Parceiros from './pages/Parceiros';
import Lancamentos from './pages/Lancamentos';
import ClassificacaoFinanceira from './pages/ClassificacaoFinanceira';
import CategoriaPage from './pages/CategoriaPage';
import SubcategoriaPage from './pages/SubcategoriaPage';
import { FaBars } from 'react-icons/fa';
import './App.css';

function App() {
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <div className="fullscreen">
      <BrowserRouter>
        <div className="menu-toggle">
          <button onClick={() => setMenuAberto(!menuAberto)} title="Alternar Menu">
            <FaBars size={18} />
          </button>
        </div>

        <div className="container">
          {menuAberto && (
            <nav className="menu">
              <h2>📋 Menu</h2>
              <ul>
                <li><Link to="/videos">🎥 Vídeos</Link></li>
                <li><Link to="/classificacao">📂 Classificação Financeira</Link></li>
                <li><Link to="/parceiros">👥 Parceiros</Link></li>
                <li><Link to="/lancamentos">💰 Lançamentos</Link></li>
              </ul>
            </nav>
          )}

          <main className="content">
            <Routes>
              <Route path="/videos" element={<Videos />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/lancamentos" element={<Lancamentos />} />
              <Route path="/classificacao" element={<ClassificacaoFinanceira />} />
              <Route path="/classificacao/categorias" element={<CategoriaPage />} />
              <Route path="/classificacao/subcategorias" element={<SubcategoriaPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
