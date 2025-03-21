import { useEffect, useState } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', duration: 0 });
  const [search, setSearch] = useState('');

  async function fetchVideos(searchTerm = '') {
    const response = await fetch(`https://node-do-zero-le2o.onrender.com/videos?search=${searchTerm}`);
    const data = await response.json();
    setVideos(data);
  } 

  useEffect(() => {
    fetchVideos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('https://node-do-zero-le2o.onrender.com/videos', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', duration: 0 });
    fetchVideos();
  }

  async function handleDelete(id) {
    await fetch(`https://node-do-zero-le2o.onrender.com/videos/${id}`, {
      method: 'DELETE',
    });
    fetchVideos();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 Gerenciador de Vídeos</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duração"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
        />
        <button type="submit">Salvar</button>
      </form>

      <hr />

      <input
        placeholder="Buscar vídeos..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchVideos(e.target.value);
        }}
      />

      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <strong>{video.title}</strong> ({video.duration}s)
            <p>{video.description}</p>
            <button onClick={() => handleDelete(video.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
