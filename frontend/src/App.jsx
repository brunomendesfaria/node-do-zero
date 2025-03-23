import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Categorias from './pages/Categorias';
import Parceiros from './pages/Parceiros';
import Lancamentos from './pages/Lancamentos';
import Videos from './pages/Videos';  


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="menu">
          <h2>📋 Menu</h2>
          <ul>
            <li><Link to="/videos">🎥 Vídeos</Link></li>
            <li><Link to="/categorias">📂 Categorias</Link></li>
            <li><Link to="/parceiros">👥 Parceiros</Link></li>
            <li><Link to="/lancamentos">💰 Lançamentos</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Routes>            
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/lancamentos" element={<Lancamentos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
